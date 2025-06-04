import { Request, Response } from 'express';
import { getExperienceByIdService } from '@/services/Experience/getExperienceByIdService';

export const getExperienceByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const emprendedor_id = req.body.userId;

        const Experience = await getExperienceByIdService(parseInt(id), emprendedor_id);

        if (!Experience) {
            return res.status(404).json({ mensaje: "Contenido no encontrado" });
        }

        res.status(200).json(Experience);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el contenido" });
    }
};