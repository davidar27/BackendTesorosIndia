import { Request, Response } from 'express';
import { getExperienceByIdService } from '@/services/Experience/getExperienceByIdService';
import { updateStatusExperienceService } from '@/services/Experience/updateStatusExperienceService';

const updateStatusExperienceController = async (req: Request, res: Response) => {
    const { experience_id } = req.params;
    const { status } = req.body;

    const experience = await getExperienceByIdService(Number(experience_id));
    if (!experience) {
        return res.status(404).json({ message: 'Experience not found' });
    }
    const result = await updateStatusExperienceService(Number(experience_id), status);
    
    if (result.affectedRows > 0) {
        return res.status(200).json({ 
            message: 'El estado de la experiencia se ha actualizado correctamente',
            experience_id: Number(experience_id),
            new_status: status,
            affected_rows: result.affectedRows
        });
    } else {
        return res.status(400).json({ 
            message: 'No se pudo actualizar el estado de la experiencia' 
        });
    }
}

export default updateStatusExperienceController