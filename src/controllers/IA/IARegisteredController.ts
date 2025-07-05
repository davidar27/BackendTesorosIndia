import { Request, Response } from "express";
import IAService from "@/services/IA/IAService";

const IARegisteredController = async (req: Request, res: Response) => {
    try {
        const { userId: id_user, role } = req.body;
        const { prompt, history = [] } = req.body;
        const response = await IAService.getResponse(prompt, history, role, id_user);
        return res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener respuesta de la inteligencia artificial."
        });
    }
}

export default IARegisteredController;