import { Request, Response } from "express";
import { findByEmailUserService } from "../../services/User/findByEmailUserService";

// Cache para rate limiting
const checkAttempts = new Map<string, { count: number; timestamp: number }>();
const MAX_ATTEMPTS = 24; // 24 intentos (2 minutos con intervalos de 5 segundos)
const WINDOW_MS = 120000; // 2 minutos
const MIN_INTERVAL = 4000; // Mínimo 4 segundos entre intentos

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function cleanupOldEntries() {
    const now = Date.now();
    for (const [email, data] of checkAttempts.entries()) {
        if (now - data.timestamp > WINDOW_MS) {
            checkAttempts.delete(email);
        }
    }
}

export const checkVerification = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;

        // Validar que el email existe y tiene formato correcto
        if (!email) {
            return res.status(400).json({ 
                error: 'Email requerido',
                details: 'Debe proporcionar un email para verificar'
            });
        }

        // Decodificar el email si viene codificado en la URL
        const decodedEmail = decodeURIComponent(email).trim();

        if (!isValidEmail(decodedEmail)) {
            return res.status(400).json({ 
                error: 'Email inválido',
                details: 'El formato del email no es válido'
            });
        }

        // Limpiar entradas antiguas
        cleanupOldEntries();

        // Rate limiting
        const now = Date.now();
        const userAttempts = checkAttempts.get(decodedEmail);

        if (userAttempts) {
            const timeSinceLastAttempt = now - userAttempts.timestamp;

            // Verificar intervalo mínimo
            if (timeSinceLastAttempt < MIN_INTERVAL) {
                return res.status(429).json({
                    error: 'Demasiado rápido',
                    details: 'Por favor, espere al menos 4 segundos entre verificaciones',
                    retryAfter: Math.ceil((MIN_INTERVAL - timeSinceLastAttempt) / 1000)
                });
            }

            // Verificar límite de intentos
            if (userAttempts.count >= MAX_ATTEMPTS) {
                return res.status(429).json({
                    error: 'Límite excedido',
                    details: 'Ha excedido el número máximo de intentos de verificación',
                    retryAfter: Math.ceil((WINDOW_MS - (now - userAttempts.timestamp)) / 1000)
                });
            }

            userAttempts.count++;
            userAttempts.timestamp = now;
        } else {
            checkAttempts.set(decodedEmail, { count: 1, timestamp: now });
        }

        // Buscar usuario
        const user = await findByEmailUserService(decodedEmail);

        if (!user) {
            return res.status(404).json({ 
                isVerified: false,
                details: 'Usuario no encontrado'
            });
        }

        // Si el usuario está verificado, limpiar sus intentos
        if (user.verified) {
            checkAttempts.delete(decodedEmail);
            return res.json({ 
                isVerified: true,
                details: 'Email verificado'
            });
        }

        return res.json({ 
            isVerified: false,
            details: 'Email pendiente de verificación',
            attemptCount: checkAttempts.get(decodedEmail)?.count || 1,
            maxAttempts: MAX_ATTEMPTS
        });

    } catch (error) {
        return res.status(500).json({ 
            error: 'Error al verificar el estado',
            details: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};