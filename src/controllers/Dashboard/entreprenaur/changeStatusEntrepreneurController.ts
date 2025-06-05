import {Request, Response} from 'express'
import { changeStatusEntrepreneurService } from '@/services/Dashboard/entrepreneur/changeStatusEntrepreneurService';


export const changeStatusEntrepreneurController = async (req: Request, res: Response) => {
    const { userId } = req.params;        
    let { status } = req.body;

    if (status === 'active') {
        status = 'Activo';
    } else if (status === 'inactive') {
        status = 'Inactivo';
    }

    try {
        const updated = await changeStatusEntrepreneurService(Number(userId), status);
        return res.status(200).json(updated);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};