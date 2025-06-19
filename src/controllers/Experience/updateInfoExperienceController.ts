import { Request, Response } from 'express';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { deleteFromAzureService } from '@/services/Azure/deleteFromAzureService';
import { getExperienceByIdService } from '@/services/Experience/getExperienceByIdService';
import { updateInfoExperienceService } from '@/services/Experience/updateInfoExperienceService';

export const updateInfoExperienceController = async (req: Request, res: Response) => {
    try {
        const { experience_id } = req.params;
        const { description, history } = req.body;
        const entrepreneur_id = req.body.user_id;
        const image: any = req.file;
        const experience = await getExperienceByIdService(Number(experience_id), entrepreneur_id);
        if (!experience) {
            return res.status(404).json({ message: 'experiencia no encontrada' });
        }
        let imageUrl: any;
        if (image) {
            await deleteFromAzureService(experience.image);
            imageUrl = await uploadToAzureService(image);
        }
        else {
            imageUrl = experience.image
        }
        const updatedExperience = {
            id: parseInt(experience_id),
            name: experience.name,
            description: description || experience.description,
            history: history || experience.history,
            // location: location || experience.location,
            entrepreneur_id: entrepreneur_id,
            image: imageUrl,
        };
        await updateInfoExperienceService(updatedExperience);
        res.status(200).json({
            experience: updatedExperience,
            message: "Contenido actualizado correctamente"
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar contenido" });
    }
};