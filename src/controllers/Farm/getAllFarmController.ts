import { Request, Response } from 'express';
import { getAllFarmServices } from '../../services/Farm/getAllFarmServices';



export const getAllFarmController = async (req: Request, res: Response) => {
    try {
        const farms = await getAllFarmServices();
        res.json({ message: 'Lista de Fincas', farms });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar fincas' });
    }
}


