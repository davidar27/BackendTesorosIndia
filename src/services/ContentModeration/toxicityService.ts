import * as toxicity from '@tensorflow-models/toxicity';
import { moderationConfig } from '@/config/moderation';
import { checkSpanishProfanity, getReplacementSuggestions } from './spanishProfanityFilter';

interface ToxicityResult {
  label: string;
  results: Array<{
    match: boolean;
    probabilities: Float32Array;
  }>;
}

interface ModerationResult {
  isToxic: boolean;
  toxicCategories: string[];
  confidence: number;
  safeToPost: boolean;
}

class ToxicityService {
  private model: toxicity.ToxicityClassifier | null = null;
  private isModelLoaded = false;

  /**
   * Carga el modelo de toxicidad
   */
  async loadModel(): Promise<void> {
    if (this.isModelLoaded) return;

    try {
      // Cargar el modelo con umbral más bajo para detectar más contenido
      this.model = await toxicity.load(moderationConfig.toxicityThreshold, ['toxicity', 'severe_toxicity', 'identity_attack', 'insult', 'obscene', 'sexual_explicit', 'threat']);
      this.isModelLoaded = true;
    } catch (error) {
      console.error('Error al cargar el modelo de toxicidad:', error);
      throw new Error('No se pudo cargar el modelo de moderación');
    }
  }

  /**
   * Analiza el texto para detectar contenido tóxico
   */
  async analyzeText(text: string): Promise<ModerationResult> {
    if (!this.model) {
      await this.loadModel();
    }

    if (!text || text.trim().length === 0) {
      return {
        isToxic: false,
        toxicCategories: [],
        confidence: 0,
        safeToPost: true
      };
    }

    try {
      const predictions = await this.model!.classify(text);
      
      
      const toxicCategories: string[] = [];
      let maxConfidence = 0;

      predictions.forEach((prediction: ToxicityResult) => {
        const result = prediction.results[0];

        
        if (result.match) {
          toxicCategories.push(prediction.label);
          const confidence = result.probabilities[1] || 0; // Float32Array index
          maxConfidence = Math.max(maxConfidence, confidence);
        }
      });

      const isToxic = toxicCategories.length > 0;
      const safeToPost = !isToxic || maxConfidence < moderationConfig.confidenceThreshold;



      return {
        isToxic,
        toxicCategories,
        confidence: maxConfidence,
        safeToPost
      };
    } catch (error) {
      console.error('Error al analizar texto:', error);
      // En caso de error, permitimos el contenido para no bloquear la funcionalidad
      return {
        isToxic: false,
        toxicCategories: [],
        confidence: 0,
        safeToPost: true
      };
    }
  }

  /**
   * Valida si un comentario es apropiado para publicar
   */
  async validateComment(comment: string): Promise<{
    isValid: boolean;
    reason?: string;
    toxicCategories?: string[];
    spanishProfanity?: {
      foundWords: string[];
      severity: 'low' | 'medium' | 'high';
      suggestion?: string;
    };
  }> {
    // Primero verificar con el filtro de español
    const spanishCheck = checkSpanishProfanity(comment);
    
    if (spanishCheck.hasProfanity) {
      const suggestion = getReplacementSuggestions(comment);
      
      return {
        isValid: false,
        reason: `El comentario contiene lenguaje inapropiado en español: ${spanishCheck.foundWords.join(', ')}`,
        toxicCategories: ['spanish_profanity'],
        spanishProfanity: {
          foundWords: spanishCheck.foundWords,
          severity: spanishCheck.severity,
          suggestion
        }
      };
    }

    // Luego verificar con el modelo de TensorFlow
    const result = await this.analyzeText(comment);

    if (!result.safeToPost) {
      return {
        isValid: false,
        reason: `El comentario contiene contenido inapropiado: ${result.toxicCategories.join(', ')}`,
        toxicCategories: result.toxicCategories
      };
    }

    return {
      isValid: true
    };
  }

  /**
   * Obtiene el estado del modelo
   */
  getModelStatus(): { isLoaded: boolean } {
    return {
      isLoaded: this.isModelLoaded
    };
  }
}

// Exportar una instancia singleton
export const toxicityService = new ToxicityService(); 