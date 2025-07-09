import { Request, Response, NextFunction } from 'express';
import { toxicityService } from '@/services/ContentModeration/toxicityService';

interface ModerationRequest extends Request {
    body: {
        review?: string;
        comment?: string;
        review_text?: string;
        description?: string;
        [key: string]: any;
    };
}

/**
 * Middleware para validar contenido tóxico en comentarios
 */
export const validateContentMiddleware = async (
    req: ModerationRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Buscar el campo de comentario en el body
        const commentText = req.body.review ||
            req.body.comment ||
            req.body.review_text ||
            req.body.description ||
            req.body.text ||
            req.body.content;


        if (!commentText || typeof commentText !== 'string') {
            return next();
        }

        // Validar el comentario
        const validation = await toxicityService.validateComment(commentText);

        if (!validation.isValid) {
            
            const response: any = {
                success: false,
                message: 'El contenido no cumple con las políticas de la comunidad',
                error: validation.reason,
                toxicCategories: validation.toxicCategories
            };
            
            // Agregar sugerencia si está disponible
            if (validation.spanishProfanity?.suggestion) {
                response.suggestion = validation.spanishProfanity.suggestion;
                response.severity = validation.spanishProfanity.severity;
            }
            
            res.status(400).json(response);
            return;
        }

        next();
    } catch (error) {
        console.error('Error en validación de contenido:', error);
        // En caso de error, permitimos el contenido para no bloquear la funcionalidad
        next();
    }
};

/**
 * Middleware para validar contenido con logging
 */
export const validateContentWithLoggingMiddleware = async (
    req: ModerationRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const commentText = req.body.comment ||
            req.body.review_text ||
            req.body.description ||
            req.body.text ||
            req.body.content;

        if (!commentText || typeof commentText !== 'string') {
            return next();
        }

        await toxicityService.analyzeText(commentText);


        // Validar el comentario
        const validation = await toxicityService.validateComment(commentText);

        if (!validation.isValid) {
            res.status(400).json({
                success: false,
                message: 'El contenido no cumple con las políticas de la comunidad',
                error: validation.reason,
                toxicCategories: validation.toxicCategories
            });
            return;
        }

        next();
    } catch (error) {
        console.error('Error en validación de contenido con logging:', error);
        next();
    }
};

/**
 * Middleware para validar contenido solo en modo estricto
 */
export const strictContentValidationMiddleware = async (
    req: ModerationRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const commentText = req.body.comment ||
            req.body.review_text ||
            req.body.description ||
            req.body.text ||
            req.body.content;

        if (!commentText || typeof commentText !== 'string') {
            return next();
        }

        // Análisis más estricto
        const analysis = await toxicityService.analyzeText(commentText);

        // En modo estricto, cualquier toxicidad detectada bloquea el contenido
        if (analysis.isToxic) {
            res.status(400).json({
                success: false,
                message: 'El contenido contiene lenguaje inapropiado',
                error: `Contenido tóxico detectado: ${analysis.toxicCategories.join(', ')}`,
                toxicCategories: analysis.toxicCategories,
                confidence: analysis.confidence
            });
            return;
        }

        next();
    } catch (error) {
        console.error('Error en validación estricta de contenido:', error);
        next();
    }
}; 