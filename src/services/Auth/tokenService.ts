/* 
export const TokenService = {
    async saveRefreshToken(userId: string, token: string) {
        await prisma.refreshToken.create({
            data: {
                token,
                userId,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
            }
        });
    },

    async verifyRefreshToken(userId: string, token: string) {
        const storedToken = await prisma.refreshToken.findFirst({
            where: {
                token,
                userId,
                expiresAt: { gt: new Date() }
            }
        });
        return !!storedToken;
    },

    async replaceRefreshToken(oldToken: string, newToken: string) {
        await prisma.$transaction([
            prisma.refreshToken.deleteMany({ where: { token: oldToken } }),
            prisma.refreshToken.create({
                data: {
                    token: newToken,
                    userId: (await prisma.refreshToken.findUnique({ where: { token: oldToken } }))?.userId || '',
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                }
            })
        ]);
    },

    async revokeRefreshToken(token: string) {
        await prisma.refreshToken.deleteMany({ where: { token } });
    }
}; */