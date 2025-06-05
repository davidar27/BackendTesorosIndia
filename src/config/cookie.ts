const isProduction = process.env.NODE_ENV === 'production';
const domain = process.env.FRONTEND_URL;
import { CookieOptions } from 'express';


export const cookieOptionsLogin: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 5, // 5 minutos
    path: '/',
    domain: isProduction ? domain : undefined
};

export const cookieOptionsRefresh: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    domain: isProduction ? domain : undefined
};

export const cookieOptionsLogout: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    domain: isProduction ? domain : undefined
};