const isProduction = process.env.NODE_ENV === 'production';
import { CookieOptions } from 'express';

export const cookieOptionsLogin: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 5, // 5 minutos
    path: '/',
};

export const cookieOptionsRefresh: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
};

export const cookieOptionsLogout = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
};