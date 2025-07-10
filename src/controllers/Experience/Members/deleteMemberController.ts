import { deleteMemberService } from '@/services/Experience/Member/deleteMemberService';
import { Request, Response } from 'express';

export const deleteMemberController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { memberId } = req.params
        await deleteMemberService(parseInt(memberId));
        res.status(200).json("Integrante agregado con exito.");
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al agregar integrantes"
        });
    }
}; 