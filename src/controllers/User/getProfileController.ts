import { getProfileService } from '@/services/User/getProfileService';
import { Request, Response } from 'express';

export const getProfileController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(id);

        const profile = await getProfileService(Number(id));

        if (!profile) {
            res.status(404).json({ error: 'Perfil no encontrado' });
            return;
        }

        res.status(200).json(profile);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener el perfil"
        });
    }
};
