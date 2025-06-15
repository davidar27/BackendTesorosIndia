import { Request, Response } from 'express';
import { getAllNamesExperienceServices } from '@/services/Experience/getAllNamesExperienceServices';



export const getAllNamesExperienceController = async (req: Request, res: Response) => {
    try {
        const experiences = await getAllNamesExperienceServices();
        return res.status(200).json({
            experiences: experiences
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al listar experiencias'
        });
    }
}

