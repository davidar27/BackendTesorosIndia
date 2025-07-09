import { Request, Response } from "express";
import IAService from "@/services/IA/IAService";

export const IAController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { prompt, history = [], role = "observador", id_user = 0, category_id } = req.body;
        const response = await IAService.getResponse(prompt, history, role, id_user, category_id);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener respuesta de la inteligencia artificial."
        });
    }
}; 