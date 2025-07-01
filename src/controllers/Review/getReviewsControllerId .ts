import { Request, Response } from 'express';
import { getReviewsByFincaServiceId } from '@/services/Review/getReviewsServiceId';

export const getReviewsByFincaControllerId = async (req: Request, res: Response) => {
    try {
        const { experiencie_id } = req.params;
        const valoraciones = await getReviewsByFincaServiceId(parseInt(experiencie_id));
        
        res.status(200).json(valoraciones);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener valoraciones" });
    }
};