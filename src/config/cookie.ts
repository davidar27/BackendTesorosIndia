

export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    maxAge: 1000 * 60 * 60 * 24,
    path: '/',
    partitioned: true
};

export const cookieOptionsLogout = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    path: '/',
    partitioned: true
};
