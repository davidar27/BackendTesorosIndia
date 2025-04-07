import jwt from 'jsonwebtoken';
import { TokenPayload } from '../../models/Auth/Auth';


export const generateToken = (payload: TokenPayload, secret: string, expiresInMinutes: number): string => {
    if (!secret) {
        throw new Error('Token secret is required');
    }

    return jwt.sign(
        { data: payload },
        secret,
        { expiresIn: `${expiresInMinutes}m` }
    );
};