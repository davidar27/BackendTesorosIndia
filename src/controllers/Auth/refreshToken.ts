import { Request, Response } from 'express';
import { cookieOptionsRefresh } from '../../config/cookie';


export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        const { newAccessToken, user } = await refreshToken(refreshToken);

        res.cookie('access_token', newAccessToken, {
            ...cookieOptionsRefresh,
            maxAge: 1000 * 60 * 60, // 1h
        });

        res.json({ user });
    } catch (error) {
    }
};