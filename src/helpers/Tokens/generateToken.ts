import jwt from 'jsonwebtoken';
import { TokenPayload } from '../../models/Auth/Auth';
import crypto from 'crypto';


/**
 * Generates a JWT token with the given payload
 * @param payload - The data to include in the token
 * @param secret - Secret key for signing the token
 * @param expiresIn - Token expiration (e.g. '1h', '7d', or number of seconds)
 * @returns JWT token string
 */
export const generateToken = (
    payload: TokenPayload,
    secret: string,
    expiresIn: string | number
): string => {
    if (!secret) throw new Error('Token secret is required');

    try {
        const token = jwt.sign(
            {
                data: payload,
                jti: crypto.randomUUID(),
                token_version: payload.token_version
            },
            secret,
            { expiresIn } as jwt.SignOptions,
        );

        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Failed to generate token');
    }
};