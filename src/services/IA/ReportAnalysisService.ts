import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { MODEL_PREFERENCE, globalConfig } from "./models/AIModels";

dotenv.config();

const { AI_API_KEY = "" } = process.env;
const ai = new GoogleGenAI({ apiKey: AI_API_KEY });

interface ReportAnalysisRequest {
  user_id: string;
  review_id: number;
  comment_text: string;
  comment_author: string;
  report_type: string;
  reason: string;
}

interface ReportAnalysisResult {
  isOffensive: boolean;
  matchesReportType: boolean;
  confidence: number;
  analysis: string;
  detectedCategories: string[];
  recommendation: 'approve' | 'reject' | 'review';
}

class ReportAnalysisService {
  static async analyzeReport(reportData: ReportAnalysisRequest): Promise<ReportAnalysisResult> {
    try {
      const analysisPrompt = this.createAnalysisPrompt(reportData);
      
      for (const model of MODEL_PREFERENCE) {
        try {
          console.log(`Analyzing report with model: ${model}`);
          
          const chat = ai.chats.create({
            model: model,
            config: globalConfig,
          });

          const response: any = await chat.sendMessage({
            message: analysisPrompt,
          });

          const result = this.parseAnalysisResponse(response.text);
          
          // Log the analysis result
          console.log('=== REPORT ANALYSIS RESULT ===');
          console.log(`Comment: "${reportData.comment_text}"`);
          console.log(`Report Type: ${reportData.report_type}`);
          console.log(`Reason: ${reportData.reason}`);
          console.log(`Is Offensive: ${result.isOffensive}`);
          console.log(`Matches Report Type: ${result.matchesReportType}`);
          console.log(`Confidence: ${result.confidence}`);
          console.log(`Analysis: ${result.analysis}`);
          console.log(`Detected Categories: ${result.detectedCategories.join(', ')}`);
          console.log(`Recommendation: ${result.recommendation}`);
          console.log('==============================');

          return result;
        } catch (error: any) {
          console.error(`Error with model ${model} for report analysis:`, error.message);
          
          if (error.message && error.message.includes('429')) {
            continue;
          }
          continue;
        }
      }

      // Fallback response if all models fail
      console.log('All AI models failed for report analysis, using fallback response');
      return this.createFallbackResponse(reportData);
    } catch (error: any) {
      console.error("Error analyzing report:", error);
      return this.createFallbackResponse(reportData);
    }
  }

  private static createAnalysisPrompt(reportData: ReportAnalysisRequest): string {
    return `Eres un moderador de contenido experto. Analiza el siguiente reporte de comentario y responde en formato JSON.

DATOS DEL REPORTE:
- Comentario: "${reportData.comment_text}"
- Autor: ${reportData.comment_author}
- Tipo de reporte: ${reportData.report_type}
- Razón del reporte: ${reportData.reason}

TAREAS:
1. Determina si el comentario es ofensivo o inapropiado
2. Verifica si el comentario coincide con el tipo de reporte
3. Analiza la gravedad del contenido
4. Proporciona una recomendación

TIPOS DE REPORTE COMUNES:
- hate_speech: Discurso de odio, discriminación, insultos basados en características personales
- harassment: Acoso, intimidación, amenazas
- inappropriate: Contenido sexual, vulgar, grosero
- spam: Publicidad no deseada, contenido repetitivo
- fake_news: Información falsa o engañosa

RESPONDE EN ESTE FORMATO JSON:
{
  "isOffensive": boolean,
  "matchesReportType": boolean,
  "confidence": number (0-1),
  "analysis": "explicación detallada",
  "detectedCategories": ["categoría1", "categoría2"],
  "recommendation": "approve|reject|review"
}

IMPORTANTE:
- Sé objetivo y justo
- Considera el contexto cultural
- Si no estás seguro, usa "review" como recomendación
- La confianza debe ser un número entre 0 y 1`;
  }

  private static parseAnalysisResponse(responseText: string): ReportAnalysisResult {
    try {
      // Limpiar la respuesta y extraer JSON
      const cleanedText = responseText.trim();
      let jsonStart = cleanedText.indexOf('{');
      let jsonEnd = cleanedText.lastIndexOf('}') + 1;
      
      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error('No JSON found in response');
      }
      
      const jsonString = cleanedText.substring(jsonStart, jsonEnd);
      const parsed = JSON.parse(jsonString);
      
      return {
        isOffensive: Boolean(parsed.isOffensive),
        matchesReportType: Boolean(parsed.matchesReportType),
        confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0)),
        analysis: String(parsed.analysis || ''),
        detectedCategories: Array.isArray(parsed.detectedCategories) ? parsed.detectedCategories : [],
        recommendation: ['approve', 'reject', 'review'].includes(parsed.recommendation) ? parsed.recommendation : 'review'
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.createFallbackResponse({
        user_id: '',
        review_id: 0,
        comment_text: '',
        comment_author: '',
        report_type: '',
        reason: ''
      });
    }
  }

  private static createFallbackResponse(reportData: ReportAnalysisRequest): ReportAnalysisResult {
    // Análisis básico basado en palabras clave
    const comment = reportData.comment_text.toLowerCase();
    const reportType = reportData.report_type.toLowerCase();
    
    const offensiveWords = ['asqueroso', 'odio', 'pendejo', 'idiota', 'estupido', 'malo', 'terrible'];
    const hasOffensiveWords = offensiveWords.some(word => comment.includes(word));
    
    const isHateSpeech = reportType === 'hate_speech' && hasOffensiveWords;
    const isInappropriate = reportType === 'inappropriate' && hasOffensiveWords;
    
    return {
      isOffensive: hasOffensiveWords,
      matchesReportType: isHateSpeech || isInappropriate,
      confidence: hasOffensiveWords ? 0.7 : 0.3,
      analysis: `Análisis fallback: ${hasOffensiveWords ? 'Contiene palabras ofensivas' : 'No se detectaron palabras ofensivas claras'}`,
      detectedCategories: hasOffensiveWords ? ['offensive_language'] : [],
      recommendation: hasOffensiveWords ? 'review' : 'approve'
    };
  }
}

export default ReportAnalysisService;
export type { ReportAnalysisRequest, ReportAnalysisResult }; 