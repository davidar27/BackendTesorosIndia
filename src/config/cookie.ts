const isProduction = process.env.NODE_ENV === 'production';
import { CookieOptions } from 'express';

const allowedDomains = [
    'backendtesorosindia-staging.up.railway.app',
    'localhost'
];

export const cookieOptionsLogin: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 5, // 5 minutos
    path: '/',
    domain: isProduction ? '.up.railway.app' : undefined
};

export const cookieOptionsRefresh: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    domain: isProduction ? '.up.railway.app' : undefined
};

export const cookieOptionsLogout = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    domain: isProduction ? '.up.railway.app' : undefined
};