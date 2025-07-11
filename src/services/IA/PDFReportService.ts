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

        const formatDate = (date: Date) => {
            return date.toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        // Generar contenido específico según el tipo de informe
        let mainContent = '';
        
        switch (reportData.metadata.reportType) {
            case 'sales':
                mainContent = this.generateSalesContent(reportData, formatCurrency);
                break;
            case 'products':
                mainContent = this.generateProductsContent(reportData, formatCurrency);
                break;
            case 'experiences':
                mainContent = this.generateExperiencesContent(reportData);
                break;
            default:
                mainContent = this.generateGenericContent(reportData);
        }

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${reportData.title}</title>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    margin: 0; 
                    padding: 20px; 
                    background-color: #f5f5f5;
                    color: #333;
                }
                .container { 
                    max-width: 800px; 
                    margin: 0 auto; 
                    background: white; 
                    padding: 30px; 
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 30px; 
                    border-bottom: 3px solid #00a63d;
                    padding-bottom: 20px;
                }
                .logo { max-width: 150px; margin-bottom: 15px; }
                .title { 
                    color: #00a63d; 
                    font-size: 28px; 
                    margin: 10px 0; 
                    font-weight: 600;
                }
                .subtitle {
                    color: #666;
                    font-size: 16px;
                    margin: 5px 0;
                }
                .summary-box {
                    background: linear-gradient(135deg, #00a63d, #008f35);
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                    text-align: center;
                }
                .summary-title {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                .summary-value {
                    font-size: 32px;
                    font-weight: bold;
                    margin: 5px 0;
                }
                .section {
                    margin: 25px 0;
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border-left: 4px solid #00a63d;
                }
                .section-title {
                    color: #00a63d;
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 15px;
                }
                .highlight-box {
                    background: #e8f5e8;
                    border: 1px solid #00a63d;
                    border-radius: 6px;
                    padding: 15px;
                    margin: 15px 0;
                }
                .highlight-title {
                    color: #00a63d;
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                .simple-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                    background: white;
                    border-radius: 6px;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .simple-table th {
                    background: #00a63d;
                    color: white;
                    padding: 12px;
                    text-align: left;
                    font-weight: 600;
                }
                .simple-table td {
                    padding: 12px;
                    border-bottom: 1px solid #eee;
                }
                .simple-table tr:hover {
                    background: #f8f9fa;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                    color: #666;
                    font-size: 14px;
                }
                .metric {
                    display: inline-block;
                    margin: 10px 20px;
                    text-align: center;
                }
                .metric-value {
                    font-size: 24px;
                    font-weight: bold;
                    color: #00a63d;
                }
                .metric-label {
                    font-size: 14px;
                    color: #666;
                    margin-top: 5px;
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
                
                ${mainContent}
                
                <div class="footer">
                    <p>📊 Informe generado automáticamente por Tesoros de la India</p>
                    <p>💡 Para más detalles, consulta tu panel de control</p>
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
export type { PDFReportRequest }; 