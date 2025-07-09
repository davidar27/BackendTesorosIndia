import { Request, Response } from 'express';
import ReportAnalysisService, { ReportAnalysisRequest } from '../../services/IA/ReportAnalysisService';
import { reportedReviewService } from '@/services/Review/reportedReviewService';

interface AnalyzeReportRequest extends Request {
  body: {
    user_id: string;
    review_id: number;
    comment_text: string;
    comment_author: string;
    report_type: string;
    reason: string;
  };
}

export const analyzeReportController = async (req: AnalyzeReportRequest, res: Response) => {
  try {
    const {
      user_id,
      review_id,
      comment_text,
      comment_author,
      report_type,
      reason
    } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!user_id || !review_id || !comment_text || !comment_author || !report_type || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos: user_id, review_id, comment_text, comment_author, report_type, reason'
      });
    }

    // Crear el objeto de datos para el análisis
    const reportData: ReportAnalysisRequest = {
      user_id,
      review_id,
      comment_text,
      comment_author,
      report_type,
      reason
    };

    // Realizar el análisis con IA
    const analysisResult = await ReportAnalysisService.analyzeReport(reportData);

    if (analysisResult.isOffensive || analysisResult.matchesReportType) {
      await reportedReviewService(review_id)
    }

    // Responder con el resultado del análisis
    return res.status(200).json({
      success: true,
      message: 'Análisis de reporte completado',
      data: {
        report: reportData,
        analysis: analysisResult
      }
    });

  } catch (error: any) {
    console.error('Error en analyzeReportController:', error);

    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al analizar el reporte',
      error: error.message
    });
  }
}; 