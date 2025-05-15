

export const cookieOptionsLogin = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    maxAge: 1000 * 60 * 60 * 24,
    path: '/',
};

export const cookieOptionsLogout = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    path: '/',
};

export const cookieOptionsRefresh = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
};
