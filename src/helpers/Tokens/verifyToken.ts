import jwt from 'jsonwebtoken';
import { TokenPayload } from '../../models/Auth/Auth';

export const verifyToken = <T extends TokenPayload>(token: string, secret: string): T => {
    if (!token || !secret) throw new Error('Token and secret are required');

    try {
        const decoded = jwt.verify(token, secret) as { data: T };
        return decoded.data;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expirado');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token inválido');
        }
        throw error;
    }
};