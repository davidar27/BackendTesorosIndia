import { Request, Response } from 'express';
import { toxicityService } from '@/services/ContentModeration/toxicityService';

export const getModerationStatusController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const status = toxicityService.getModelStatus();

        res.status(200).json({
            success: true,
            data: {
                modelLoaded: status.isLoaded,
                service: 'Toxicity Detection',
                version: '1.0.0',
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error al obtener estado de moderación:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener estado del servicio de moderación'
        });
    }
};

export const testModerationController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string') {
            res.status(400).json({
                success: false,
                message: 'Se requiere un campo "text" con el contenido a analizar'
            });
            return;
        }

        const analysis = await toxicityService.analyzeText(text);
        const validation = await toxicityService.validateComment(text);

        res.status(200).json({
            success: true,
            data: {
                text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
                analysis,
                validation,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error al probar moderación:', error);
        res.status(500).json({
            success: false,
            message: 'Error al analizar el contenido'
        });
    }
}; 