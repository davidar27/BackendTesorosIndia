import { Request, Response } from 'express';
import { getAllExperienceServices } from '@/services/Experience/getAllExperienceServices';



export const getAllExperienceController = async (req: Request, res: Response) => {
    try {
        const experiences = await getAllExperienceServices();
        return res.status(200).json({
            status: 'success',
            experiences: experiences
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al listar experiencias'
        });
    }
}

