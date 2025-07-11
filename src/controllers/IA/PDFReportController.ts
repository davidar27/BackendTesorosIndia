import { Request, Response } from 'express';
import PDFReportService, { PDFReportRequest } from '../../services/IA/PDFReportService';
import { authMiddlewareToken } from '../../middleware/Auth/authMiddlewareToken';
import { checkRole } from '../../middleware/Auth/checkRole';
import IAService from '../../services/IA/IAService';
import PDFGeneratorService from '../../services/IA/PDFGeneratorService';
import { findByIdUserService } from '@/services/User/findByIdUserService';

interface PDFReportControllerRequest extends Request {
    body: {
        reportType: 'sales' | 'products' | 'experiences' | 'custom';
        experienceId?: number;
        dateRange?: {
            start: string;
            end: string;
        };
        customQuery?: string;
    };
    user?: {
        userId: number;
        role: "emprendedor" | "cliente" | "administrador";
    };
}

export const generatePDFReportController = async (req: PDFReportControllerRequest, res: Response) => {
    try {
        const { reportType, experienceId, dateRange, customQuery } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no autenticado'
            });
        }

        // Validar que solo emprendedores puedan generar informes
        if (req.user?.role !== 'emprendedor') {
            return res.status(403).json({
                success: false,
                message: 'Solo los emprendedores pueden generar informes'
            });
        }

        // Validar campos requeridos
        if (!reportType) {
            return res.status(400).json({
                success: false,
                message: 'Tipo de informe es requerido'
            });
        }

        // Preparar la solicitud del informe
        const reportRequest: PDFReportRequest = {
            reportType,
            userId,
            experienceId,
            customQuery
        };

        // Agregar rango de fechas si se proporciona
        if (dateRange) {
            reportRequest.dateRange = {
                start: new Date(dateRange.start),
                end: new Date(dateRange.end)
            };
        }

        // Generar el informe usando IA
        const reportData = await PDFReportService.generateReport(reportRequest);

        // Generar HTML para el PDF
        const htmlContent = PDFReportService.generateHTMLFromReport(reportData);

        // Por ahora, devolvemos el HTML. Para generar PDF real necesitarías una librería como puppeteer
        return res.status(200).json({
            success: true,
            message: 'Informe generado exitosamente',
            data: {
                report: reportData,
                htmlContent: htmlContent,
                // Aquí podrías agregar la URL del PDF generado si usas una librería de PDF
                pdfUrl: null // Por implementar
            }
        });

    } catch (error: any) {
        console.error('Error en generatePDFReportController:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al generar el informe',
            error: error.message
        });
    }
};

// Controlador para obtener tipos de informes disponibles
export const getAvailableReportTypesController = async (req: Request, res: Response) => {
    try {
        const reportTypes = [
            {
                id: 'sales',
                name: 'Informe de Ventas',
                description: 'Análisis de ventas y productos más vendidos',
                requiresExperience: true
            },
            {
                id: 'products',
                name: 'Informe de Productos',
                description: 'Análisis de productos y rendimiento',
                requiresExperience: true
            },
            {
                id: 'experiences',
                name: 'Informe de Experiencias',
                description: 'Análisis de experiencias culturales',
                requiresExperience: false
            },
            {
                id: 'custom',
                name: 'Informe Personalizado',
                description: 'Informe basado en consulta personalizada',
                requiresExperience: false
            }
        ];

        return res.status(200).json({
            success: true,
            data: reportTypes
        });

    } catch (error: any) {
        console.error('Error en getAvailableReportTypesController:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

export const downloadEntrepreneurPDFController = async (req: Request, res: Response) => {
    try {
        // Obtén el ID del usuario autenticado
        const userId = req.query.userId ? Number(req.query.userId) : undefined;;
        console.log(userId)

        const userIdNum = Number(userId);

        if (!userId || isNaN(userIdNum)) {
            return res.status(400).json({ error: 'Parámetro userId inválido' });
        }


        const user = await findByIdUserService(userIdNum);
        if (!user || !user.experience_id) {
            return res.status(404).json({ error: 'Usuario no encontrado o sin experiencia asociada' });
        }

        // Genera el informe y el PDF
        const { pdfReportData } = await IAService.generateEntrepreneurPDFReport(userId, user.experience_id);
        const pdfBuffer = await PDFGeneratorService.generatePDFFile(pdfReportData);

        // Configura headers para descarga
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=\"informe_experiencia.pdf\"');
        res.send(pdfBuffer);
    } catch (error: any) {
        console.error('Error al generar o enviar el PDF:', error);
        res.status(500).json({ success: false, message: 'Error al generar el PDF', error: error.message });
    }
}; 