import { Request, Response } from 'express';
import { getAllFarmServices } from '@/services/Farm/getAllFarmServices';



export const getAllFarmController = async (req: Request, res: Response) => {
    try {
        const farms = await getAllFarmServices();
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

