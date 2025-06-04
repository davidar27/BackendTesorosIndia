import { Request, Response } from "express";


import { findByIdUserService } from "@/services/User/findByIdUserService";
import { desactivateEntrepreneurService } from "@/services/Dashboard/entrepreneur/desactivateEntrepreneurService";



export const desactivateEntrepreneurController = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await findByIdUserService(Number(userId));

    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    if (user.role !== 'emprendedor') {
        return res.status(400).json({
            message: 'El usuario no es un emprendedor'
        });
    }

    await desactivateEntrepreneurService(Number(userId));

    return res.status(200).json({
        message: 'Emprendedor desactivado correctamente'
    });
}

