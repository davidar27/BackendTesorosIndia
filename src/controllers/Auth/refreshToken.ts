import { Request, Response } from 'express';
import { cookieOptionsRefresh, cookieOptionsLogin } from '../../config/cookie';
import { refreshTokenService } from '../../services/Auth/refreshTokenService';

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        
        if (!refreshToken) {
            return res.status(401).json({
                error: {
                    type: "authentication",
                    message: "No se proporcionó token de refresco"
                }
            });
        }

        const { accessToken, refreshToken: newRefreshToken, user } = await refreshTokenService(refreshToken);

        if (!accessToken || !newRefreshToken || !user) {
            return res.status(401).json({
                error: {
                    type: "authentication",
                    message: "Error al refrescar tokens"
                }
            });
        }

        res.cookie('access_token', accessToken, cookieOptionsLogin);
        res.cookie('refresh_token', newRefreshToken, cookieOptionsRefresh);

        return res.json({ user });
    } catch (error: any) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');

        return res.status(401).json({
            error: {
                type: "authentication",
                message: error.message || "Error al refrescar tokens"
            }
        });
    }
};