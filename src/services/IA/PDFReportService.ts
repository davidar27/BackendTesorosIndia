import IAService from './IAService';
import { getTopProductsByExperienceService } from '../Experience/getTopProductsByExperienceService';
import { getTotalIncomeByExperienceService } from '../Experience/getTotalIncomeByExperienceService';
import { findByIdUserService } from '../User/findByIdUserService';
import { RowDataPacket } from 'mysql2';

// Tipos para los informes
export interface ReportData {
    title: string;
    description: string;
    data: {
        sales?: any[];
        topProducts?: any[];
        experiences?: any[];
        incomeByExperience?: any[];
        topProductsByExperience?: any[];
        roomReservationsByExperience?: any[];
        packagesSoldByExperience?: any[];
        invoiceHistoryByExperience?: any[];
        [key: string]: any;
    };
    metadata: {
        generatedAt: Date;
        userId: number;
        reportType: string;
    };
}

export interface PDFReportRequest {
    reportType: 'sales' | 'products' | 'experiences' | 'custom';
    userId: number;
    experienceId?: number;
    dateRange?: {
        start: Date;
        end: Date;
    };
    customQuery?: string;
}

class PDFReportService {
    /**
     * Genera un informe usando IA para procesar y estructurar los datos
     */
    static async generateReport(request: PDFReportRequest): Promise<ReportData> {
        try {
            let reportData: ReportData;

            switch (request.reportType) {
                case 'sales':
                    reportData = await this.generateSalesReport(request);
                    break;
                case 'products':
                    reportData = await this.generateProductsReport(request);
                    break;
                case 'experiences':
                    reportData = await this.generateExperiencesReport(request);
                    break;
                case 'custom':
                    reportData = await this.generateCustomReport(request);
                    break;
                default:
                    throw new Error('Tipo de informe no soportado');
            }

            // Usar IA para mejorar la descripción del informe
            const aiPrompt = `Analiza estos datos y genera una descripción ejecutiva para un informe de ${request.reportType}:
                ${JSON.stringify(reportData.data, null, 2)}
                
                Genera una descripción profesional y concisa que resuma los puntos más importantes.`;

            const aiResponse = await IAService.getResponse(
                aiPrompt,
                [],
                'emprendedor',
                request.userId
            );

            reportData.description = aiResponse.text;

            return reportData;
        } catch (error) {
            console.error('Error generando informe:', error);
            throw new Error('Error al generar el informe');
        }
    }

    /**
     * Genera informe de ventas
     */
    private static async generateSalesReport(request: PDFReportRequest): Promise<ReportData> {
        const user = await findByIdUserService(request.userId);
        const experienceId = request.experienceId || user?.experience_id;

        if (!experienceId) {
            throw new Error('ID de experiencia no encontrado');
        }

        const salesData = await getTotalIncomeByExperienceService(experienceId);
        const topProducts = await getTopProductsByExperienceService(experienceId);

        return {
            title: 'Informe de Ventas - Tesoros de la India',
            description: 'Análisis de ventas y productos más vendidos',
            data: {
                sales: Array.isArray(salesData) ? salesData : [],
                topProducts: Array.isArray(topProducts) ? topProducts : []
            },
            metadata: {
                generatedAt: new Date(),
                userId: request.userId,
                reportType: 'sales'
            }
        };
    }

    /**
     * Genera informe de productos
     */
    private static async generateProductsReport(request: PDFReportRequest): Promise<ReportData> {
        const user = await findByIdUserService(request.userId);
        const experienceId = request.experienceId || user?.experience_id;

        if (!experienceId) {
            throw new Error('ID de experiencia no encontrado');
        }

        const topProducts = await getTopProductsByExperienceService(experienceId);

        return {
            title: 'Informe de Productos - Tesoros de la India',
            description: 'Análisis de productos y rendimiento',
            data: {
                topProducts: Array.isArray(topProducts) ? topProducts : []
            },
            metadata: {
                generatedAt: new Date(),
                userId: request.userId,
                reportType: 'products'
            }
        };
    }

    /**
     * Genera informe de experiencias
     */
    private static async generateExperiencesReport(request: PDFReportRequest): Promise<ReportData> {
        // Aquí podrías agregar lógica para obtener datos de experiencias
        return {
            title: 'Informe de Experiencias - Tesoros de la India',
            description: 'Análisis de experiencias culturales',
            data: {
                experiences: []
            },
            metadata: {
                generatedAt: new Date(),
                userId: request.userId,
                reportType: 'experiences'
            }
        };
    }

    /**
     * Genera informe personalizado usando IA
     */
    private static async generateCustomReport(request: PDFReportRequest): Promise<ReportData> {
        if (!request.customQuery) {
            throw new Error('Consulta personalizada requerida');
        }

        // Usar IA para interpretar la consulta y obtener datos relevantes
        const aiResponse = await IAService.getResponse(
            request.customQuery,
            [],
            'emprendedor',
            request.userId
        );

        return {
            title: 'Informe Personalizado - Tesoros de la India',
            description: aiResponse.text,
            data: {
                customData: (aiResponse as any).data || []
            },
            metadata: {
                generatedAt: new Date(),
                userId: request.userId,
                reportType: 'custom'
            }
        };
    }

    /**
     * Convierte los datos del informe a formato HTML para PDF
     * Diseño simple y fácil de entender
     */
    static generateHTMLFromReport(reportData: ReportData): string {
        const formatCurrency = (amount: number) => {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(amount);
        };

        const formatDate = (date: Date | string) => {
            const d = typeof date === 'string' ? new Date(date) : date;
            return d.toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        // Secciones del informe
        let sections = '';

        // 1. Ingresos por experiencia
        if (Array.isArray(reportData.data.incomeByExperience) && reportData.data.incomeByExperience.length > 0) {
            sections += `
    <div class="section">
        <div class="section-header">
            <div class="section-icon">💰</div>
            <h2 class="section-title">Ingresos por Experiencia</h2>
        </div>
        <div class="table-container">
            <table class="modern-table">
                <thead>
                    <tr>
                        <th>Experiencia</th>
                        <th>Total Ingresos</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportData.data.incomeByExperience.slice(0, 10).map((row: any, index: number) => `
                        <tr class="table-row" style="animation-delay: ${index * 0.1}s">
                            <td class="experience-name">${row.experiencia}</td>
                            <td class="income-amount">${formatCurrency(row.total_ingresos)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
    `;
        }


        // 2. Productos más vendidos por experiencia
        if (Array.isArray(reportData.data.topProductsByExperience) && reportData.data.topProductsByExperience.length > 0) {
            sections += `
    <div class="section">
        <div class="section-header">
            <div class="section-icon">🏆</div>
            <h2 class="section-title">Top 5 Productos Más Vendidos</h2>
        </div>
        <div class="table-container">
            <table class="modern-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Vendidos</th>
                        <th>Categorías</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportData.data.topProductsByExperience.slice(0, 5).map((row: any, index: number) => `
                        <tr class="table-row" style="animation-delay: ${index * 0.1}s">
                            <td class="product-name">
                                <span class="rank-badge">#${index + 1}</span>
                                ${row.producto}
                            </td>
                            <td class="price-amount">${formatCurrency(row.precio)}</td>
                            <td class="sold-count">
                                <span class="sold-badge">${row.total_vendidos}</span>
                            </td>
                            <td class="categories-list">${row.categorias}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
    `;
        }

        // 3. Reservas de habitaciones por experiencia
        if (Array.isArray(reportData.data.roomReservationsByExperience) && reportData.data.roomReservationsByExperience.length > 0) {
            sections += `
            <div class="section">
                <div class="section-title">🛏️ Reservas de Habitaciones</div>
                <table class="simple-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Habitación</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportData.data.roomReservationsByExperience.slice(0, 10).map((row: any) => `
                            <tr>
                                <td>${formatDate(row.fecha_reserva)}</td>
                                <td>${row.cliente}</td>
                                <td>${row.habitacion}</td>
                                <td>${row.estado}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            `;
        }

        // 4. Paquetes vendidos por experiencia
        if (Array.isArray(reportData.data.packagesSoldByExperience) && reportData.data.packagesSoldByExperience.length > 0) {
            sections += `
            <div class="section">
                <div class="section-title">🎒 Paquetes Vendidos</div>
                <table class="simple-table">
                    <thead>
                        <tr>
                            <th>Paquete</th>
                            <th>Veces Vendido</th>
                            <th>Ingresos Generados</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportData.data.packagesSoldByExperience.slice(0, 10).map((row: any) => `
                            <tr>
                                <td>${row.paquete}</td>
                                <td>${row.veces_vendido}</td>
                                <td>${formatCurrency(row.ingresos_generados)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            `;
        }


        // 5. Historial de facturas por cliente y experiencia
        if (Array.isArray(reportData.data.invoiceHistoryByExperience) && reportData.data.invoiceHistoryByExperience.length > 0) {
            sections += `
    <div class="section">
        <div class="section-header">
            <div class="section-icon">🧾</div>
            <h2 class="section-title">Historial de Facturas</h2>
        </div>
        <div class="table-container">
            <table class="modern-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Experiencia</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportData.data.invoiceHistoryByExperience.slice(0, 10).map((row: any, index: number) => `
                        <tr class="table-row" style="animation-delay: ${index * 0.1}s">
                            <td class="date-cell">${formatDate(row.fecha)}</td>
                            <td class="client-name">${row.cliente}</td>
                            <td class="experience-name">${row.experiencia}</td>
                            <td class="total-amount">${formatCurrency(row.total)}</td>
                            <td class="status-cell">
                                <span class="status-badge status-${row.estado.toLowerCase().replace(' ', '-')}">${row.estado}</span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
    `;
        }

        // Si no hay datos, mostrar mensaje amigable
        if (!sections) {
            sections = `<div class="section"><p>No hay datos suficientes para mostrar el informe.</p></div>`;
        }


        return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportData.title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6;
            color: #1a1a1a;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container { 
            max-width: 100%; 
            margin: 0 auto; 
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .header { 
            background: linear-gradient(135deg, #00a63d 0%, #00c851 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(180deg); }
        }
        
        .logo { 
            max-width: 350px; 
            margin-bottom: 2px;
            position: relative;
            z-index: 2;
            background: rgba(255, 255, 255, 0.86);
            padding: 5px;
        }
        
        .title { 
            font-size: 32px; 
            font-weight: 700;
            margin: 15px 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
        }
        
        .subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
            position: relative;
            z-index: 2;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .section {
            margin-bottom: 40px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            border: 1px solid rgba(0, 166, 61, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .section:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        
        .section-header {
            display: flex;
            align-items: center;
            padding: 25px 30px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-bottom: 3px solid #00a63d;
        }
        
        .section-icon {
            font-size: 24px;
            margin-right: 15px;
            background: linear-gradient(135deg, #00a63d, #00c851);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .section-title {
            font-size: 22px;
            font-weight: 600;
            color: #2d3748;
            margin: 0;
        }
        
        .table-container {
            overflow-x: auto;
            background: white;
        }
        
        .modern-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        
        .modern-table th {
            background: linear-gradient(135deg, #00a63d 0%, #00c851 100%);
            color: white;
            padding: 18px 15px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 3px solid #007a2d;
        }
        
        .table-row {
            transition: all 0.3s ease;
            opacity: 0;
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modern-table td {
            padding: 16px 15px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
        }
        
        .modern-table tr:hover {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            transform: scale(1.01);
        }
        
        .experience-name {
            font-weight: 600;
            color: #2d3748;
        }
        
        .income-amount,
        .price-amount,
        .total-amount {
            font-weight: 700;
            color: #00a63d;
            font-family: 'Courier New', monospace;
        }
        
        .rank-badge {
            display: inline-block;
            background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
            color: #744210;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 700;
            margin-right: 8px;
            box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
        }
        
        .sold-badge {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            color: #1565c0;
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 12px;
            border: 1px solid #64b5f6;
        }
        
        .status-badge {
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .status-completado,
        .status-pagado {
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .status-pendiente {
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
            color: #856404;
            border: 1px solid #ffeaa7;
        }
        
        .status-cancelado {
            background: linear-gradient(135deg, #f8d7da 0%, #f1c0c3 100%);
            color: #721c24;
            border: 1px solid #f1c0c3;
        }
        
        .categories-list {
            font-size: 12px;
            color: #6c757d;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .date-cell {
            font-family: 'Courier New', monospace;
            color: #495057;
            font-size: 13px;
        }
        
        .client-name {
            font-weight: 500;
            color: #2d3748;
        }
        
        .footer {
            background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
            color: white;
            text-align: center;
            padding: 30px;
            margin-top: 40px;
        }
        
        .footer-content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            flex-wrap: wrap;
        }
        
        .footer-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            opacity: 0.9;
        }
        
        .footer-icon {
            font-size: 18px;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .title {
                font-size: 24px;
            }
            
            .content {
                padding: 20px 15px;
            }
            
            .section-header {
                padding: 20px 15px;
            }
            
            .modern-table {
                font-size: 12px;
            }
            
            .modern-table th,
            .modern-table td {
                padding: 12px 8px;
            }
            
            .footer-content {
                flex-direction: column;
                gap: 15px;
            }
        }
        
        /* Print Styles */
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .container {
                box-shadow: none;
                border-radius: 0;
                background: white;
            }
            
            .section:hover {
                transform: none;
            }
            
            .table-row {
                animation: none;
                opacity: 1;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://i.postimg.cc/YSQp2Kmn/logotesorosindia.png" alt="Logo Tesoros de la India" class="logo">
            <h1 class="title">${reportData.title}</h1>
            <p class="subtitle">Generado el ${formatDate(reportData.metadata.generatedAt)}</p>
        </div>
        
        <div class="content">
            ${sections}
        </div>
        
        <div class="footer">
            <div class="footer-content">
                <div class="footer-item">
                    <span class="footer-icon">📊</span>
                    <span>Informe generado automáticamente por Tesorito</span>
                </div>
                <div class="footer-item">
                    <span class="footer-icon">🌟</span>
                    <span>Tesoros de la India</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;
    }

    /**
     * Genera contenido específico para informe de ventas
     */
    private static generateSalesContent(reportData: ReportData, formatCurrency: (amount: number) => string): string {
        const sales = reportData.data.sales || [];
        const topProducts = reportData.data.topProducts || [];

        let totalIncome = 0;
        if (sales.length > 0 && sales[0].total_income) {
            totalIncome = sales[0].total_income;
        }

        return `
            <div class="summary-box">
                <div class="summary-title">💰 Ingresos Totales</div>
                <div class="summary-value">${formatCurrency(totalIncome)}</div>
            </div>

            <div class="section">
                <div class="section-title">📈 Resumen de Ventas</div>
                <div class="highlight-box">
                    <div class="highlight-title">💡 Lo más importante:</div>
                    <p>${reportData.description}</p>
                </div>
            </div>

            ${topProducts.length > 0 ? `
            <div class="section">
                <div class="section-title">🏆 Productos Más Vendidos</div>
                <table class="simple-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Ventas</th>
                            <th>Ingresos</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${topProducts.slice(0, 5).map((product: any) => `
                            <tr>
                                <td><strong>${product.name || 'Producto'}</strong></td>
                                <td>${product.total_sales || 0} unidades</td>
                                <td>${formatCurrency(product.total_income || 0)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ` : ''}
        `;
    }

    /**
     * Genera contenido específico para informe de productos
     */
    private static generateProductsContent(reportData: ReportData, formatCurrency: (amount: number) => string): string {
        const topProducts = reportData.data.topProducts || [];

        return `
            <div class="section">
                <div class="section-title">📦 Análisis de Productos</div>
                <div class="highlight-box">
                    <div class="highlight-title">💡 Resumen:</div>
                    <p>${reportData.description}</p>
                </div>
            </div>

            ${topProducts.length > 0 ? `
            <div class="section">
                <div class="section-title">⭐ Productos Destacados</div>
                <table class="simple-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Rendimiento</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${topProducts.slice(0, 5).map((product: any) => `
                            <tr>
                                <td><strong>${product.name || 'Producto'}</strong></td>
                                <td>${product.total_sales || 0} ventas</td>
                                <td>${(product.total_sales || 0) > 10 ? '🟢 Excelente' : '🟡 Regular'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ` : ''}
        `;
    }

    /**
     * Genera contenido específico para informe de experiencias
     */
    private static generateExperiencesContent(reportData: ReportData): string {
        return `
            <div class="section">
                <div class="section-title">🎭 Experiencias Culturales</div>
                <div class="highlight-box">
                    <div class="highlight-title">💡 Resumen:</div>
                    <p>${reportData.description}</p>
                </div>
            </div>
        `;
    }

    /**
     * Genera contenido genérico para otros tipos de informes
     */
    private static generateGenericContent(reportData: ReportData): string {
        return `
            <div class="section">
                <div class="section-title">📊 Informe Personalizado</div>
                <div class="highlight-box">
                    <div class="highlight-title">💡 Análisis:</div>
                    <p>${reportData.description}</p>
                </div>
            </div>
        `;
    }
}

export default PDFReportService;
