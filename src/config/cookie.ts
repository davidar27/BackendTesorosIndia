import { CookieOptions } from 'express';

export const cookieOptionsLogin: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24, // 24 horas
    path: '/',
};

export const cookieOptionsRefresh: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
};

export const cookieOptionsLogout = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
};