import { Request, Response } from "express";
import { getReviewsByFincaService } from "../../services/Reviews/getReviewsService";

export const getReviewsByFincaController = async (req: Request, res: Response) => {
    try {
        const valoraciones = await getReviewsByFincaService();
        
        res.status(200).json(valoraciones);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener valoraciones" });
    }
};