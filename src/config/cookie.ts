import { getDomainFromUrl } from "../helpers/Cookie/getDomainFromUrl";


export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    domain: getDomainFromUrl(process.env.FRONTEND_URL || ''),
    maxAge: 1000 * 60 * 60 * 24,
    path: '/',
    partitioned: true
};

export const cookieOptionsLogout = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    domain: getDomainFromUrl(process.env.FRONTEND_URL || ''),
    path: '/',
    partitioned: true
};
