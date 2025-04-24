import { Request, Response } from "express";
import { getReviewsByFincaService } from "../../services/Reviews/getReviewsService";

export const getReviewsByFincaController = async (req: Request, res: Response) => {
    try {
        const { finca_id } = req.params;
        const valoraciones = await getReviewsByFincaService(parseInt(finca_id));
        
        res.status(200).json(valoraciones);
    } catch (error) {
        console.error("Error en getValoracionesController:", error);
        res.status(500).json({ mensaje: "Error al obtener valoraciones" });
    }
};