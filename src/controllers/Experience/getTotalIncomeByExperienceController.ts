import { Request, Response } from 'express';
import { getTotalIncomeByExperienceService } from '../../services/Experience/getTotalIncomeByExperienceService';
import { findByIdUserService } from '@/services/User/findByIdUserService';

export const getTotalIncomeByExperienceController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const userIdNum = Number(userId);

        if (!userId || isNaN(userIdNum)) {
            return res.status(400).json({ error: 'Parámetro userId inválido' });
        }

        const user = await findByIdUserService(userIdNum);
        if (!user || !user.experience_id) {
            return res.status(404).json({ error: 'Usuario no encontrado o sin experiencia asociada' });
        }

        const totalIncome = await getTotalIncomeByExperienceService(user.experience_id);
        return res.status(200).json(totalIncome);
    } catch (error: any) {
        console.error('Error en getTotalIncomeByExperienceController:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}; 