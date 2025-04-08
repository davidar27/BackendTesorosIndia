import { Request, Response } from 'express';
import { gettAllContentServices } from '../../services/Content/getAllContentService';



export const getAllContentController = async (req: Request, res: Response) => {
    try {
        const farms = await gettAllContentServices();
        res.json({ message: 'Lista de Fincas', farms });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar fincas' });
    }
}


