import { Request, Response } from 'express';
import { getTopProductsByExperienceService } from '../../services/Experience/getTopProductsByExperienceService';
import { findByIdUserService } from '@/services/User/findByIdUserService';

export const getTopProductsByExperienceController = async (req: Request, res: Response) => {
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

        const productos = await getTopProductsByExperienceService(user.experience_id);
        return res.status(200).json(productos);
    } catch (error: any) {
        console.error('Error en getTopProductsByExperienceController:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}; 