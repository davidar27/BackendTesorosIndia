import db from '@/config/db';

export const incrementTokenVersionRepository = async (userId: number): Promise<void> => {
    await db.query(
        'UPDATE users SET token_version = token_version + 1 WHERE id = $1',
        [userId]
    );
}; 