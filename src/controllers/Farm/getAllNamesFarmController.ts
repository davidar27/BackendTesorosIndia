import { Request, Response } from 'express';
import { getAllNamesFarmServices } from '../../services/Farm/getAllNamesFarmServices';



export const getAllNamesFarmController = async (req: Request, res: Response) => {
    try {
        const farms = await getAllNamesFarmServices();
        return res.status(200).json({
            status: 'success',
            farms: farms
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al listar fincas'
        });
    }
}

