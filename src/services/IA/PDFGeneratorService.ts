import { ReportData } from './PDFReportService';
import PDFReportService from './PDFReportService';

// Nota: Para usar este servicio, necesitarías instalar puppeteer:
// npm install puppeteer

class PDFGeneratorService {
    /**
     * Genera un archivo PDF real a partir de los datos del informe
     * Requiere: npm install puppeteer
     */
    static async generatePDFFile(reportData: ReportData): Promise<Buffer> {
        try {
            // Importar puppeteer dinámicamente para evitar errores si no está instalado
            const puppeteer = await this.getPuppeteer();
            
            // Generar HTML del informe
            const htmlContent = PDFReportService.generateHTMLFromReport(reportData);
            
            // Lanzar navegador
            const browser = await puppeteer.launch({
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            
            const page = await browser.newPage();
            
            // Configurar el contenido HTML
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0'
            });
            
            // Generar PDF
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20mm',
                    right: '20mm',
                    bottom: '20mm',
                    left: '20mm'
                }
            });
            
            await browser.close();
            
            return pdfBuffer;
            
        } catch (error) {
            console.error('Error generando PDF:', error);
            throw new Error('Error al generar el archivo PDF');
        }
    }
    
    /**
     * Genera PDF y lo guarda en Azure Storage
     */
    static async generateAndUploadPDF(reportData: ReportData): Promise<string> {
        try {
            const pdfBuffer = await this.generatePDFFile(reportData);
            
            // Generar nombre único para el archivo
            const fileName = `reportes/${reportData.metadata.reportType}_${reportData.metadata.userId}_${Date.now()}.pdf`;
            
            // Aquí usarías tu servicio de Azure existente para subir el archivo
            // const pdfUrl = await uploadToAzureService(pdfBuffer, fileName);
            
            // Por ahora, retornamos un placeholder
            return `https://tu-storage.blob.core.windows.net/multimedia/${fileName}`;
            
        } catch (error) {
            console.error('Error generando y subiendo PDF:', error);
            throw new Error('Error al generar y subir el PDF');
        }
    }
    
    /**
     * Obtiene puppeteer dinámicamente
     */
    private static async getPuppeteer() {
        try {
            return await import('puppeteer');
        } catch (error) {
            throw new Error('Puppeteer no está instalado. Ejecuta: npm install puppeteer');
        }
    }
    
    /**
     * Genera PDF usando html-pdf (alternativa más ligera)
     * Requiere: npm install html-pdf
     */
    static async generatePDFWithHtmlPdf(reportData: ReportData): Promise<Buffer> {
        try {
            const htmlPdf = await this.getHtmlPdf();
            const htmlContent = PDFReportService.generateHTMLFromReport(reportData);
            
            return new Promise((resolve, reject) => {
                const options = {
                    format: 'A4',
                    border: {
                        top: '20mm',
                        right: '20mm',
                        bottom: '20mm',
                        left: '20mm'
                    }
                };
                
                htmlPdf.create(htmlContent, options).toBuffer((err: any, buffer: Buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                });
            });
            
        } catch (error) {
            console.error('Error generando PDF con html-pdf:', error);
            throw new Error('Error al generar el archivo PDF');
        }
    }
    
    /**
     * Obtiene html-pdf dinámicamente
     */
    private static async getHtmlPdf() {
        try {
            return await import('html-pdf');
        } catch (error) {
            throw new Error('html-pdf no está instalado. Ejecuta: npm install html-pdf');
        }
    }
}

export default PDFGeneratorService; 