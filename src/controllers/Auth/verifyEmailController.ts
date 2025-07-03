import { verifyEmailVerificationToken } from '@/helpers/Tokens/verifyVerificationToken';
import { verifyEmailService } from '@/services/Auth/verifyEmailService';
import { generateAccessToken } from '@/helpers/Tokens/generateAccessToken';
import { generateRefreshToken } from '@/helpers/Tokens/generateRefreshToken';
import { UserRole } from '@/models/Auth/Auth';
import { cookieOptionsLogin, cookieOptionsRefresh } from '@/config/cookie';
import { Request, Response } from 'express';
import { findByIdUserService } from '@/services/User/findByIdUserService';

export const verifyEmailController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                error: {
                    type: "general",
                    message: "Token de verificación requerido"
                }
            });
        }

        const { userId } = verifyEmailVerificationToken(token as string);

        await verifyEmailService(userId);

        const user = await findByIdUserService(userId);

        if (!user) {
            return res.status(404).json({
                error: {
                    type: "general",
                    message: "Usuario no encontrado"
                }
            });
        }

        const { role, name, token_version, experience_id, image } = user;

        const validRoles: UserRole[] = ["cliente", "administrador", "emprendedor"];
        if (!validRoles.includes(role as UserRole)) {
            return res.status(401).json({
                error: {
                    type: "general",
                    message: "Rol de usuario no válido"
                }
            });
        }

        const accessToken = generateAccessToken(userId, name, role as UserRole, token_version, experience_id, image);
        const refreshToken = generateRefreshToken(userId, name, role as UserRole, token_version, experience_id, image);

        res.cookie('access_token', accessToken, cookieOptionsLogin);
        res.cookie('refresh_token', refreshToken, cookieOptionsRefresh);

        return res.status(200).json({
            message: 'Email verificado exitosamente',
            status: 'verified',
            user: {
                userId,
                name,
                email: user.email,
                role,
                experience_id,
                image
            }
        });

    } catch (error: any) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');

        if (error instanceof Error) {
            if (error.message.includes('expirado')) {
                return res.status(400).json({
                    error: {
                        type: "general",
                        message: "El enlace de verificación ha expirado"
                    }
                });
            }
            if (error.message.includes('inválido')) {
                return res.status(400).json({
                    error: {
                        type: "general",
                        message: "Token de verificación inválido"
                    }
                });
            }
        }

        return res.status(500).json({
            error: {
                type: "general",
                message: "Error al verificar el email"
            }
        });
    }
};