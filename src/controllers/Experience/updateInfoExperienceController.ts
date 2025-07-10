import { Request, Response } from 'express';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { deleteFromAzureService } from '@/services/Azure/deleteFromAzureService';
import { getExperienceByIdService } from '@/services/Experience/getExperienceByIdService';
import { updateInfoExperienceService } from '@/services/Experience/updateInfoExperienceService';

export const updateInfoExperienceController = async (req: Request, res: Response) => {
    try {
        const { experience_id } = req.params;
        const { name, description, story, location, lat, lng } = req.body;
        const entrepreneur_id = req.body.userId;
        const image: any = req.file;

        const experience = await getExperienceByIdService(parseInt(experience_id));
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        let imageUrl: any;
        if (image) {
            await deleteFromAzureService(experience.image);
            imageUrl = await uploadToAzureService(image);
        } else {
            imageUrl = experience.image;
        }

        const updatedExperience = {
            experience_id: parseInt(experience_id),
            name: name || experience.name,
            description: description || experience.description,
            story: story || experience.story,
            lat: lat || experience.lat,
            lng: lng || experience.lng,
            location: location || experience.location,
            entrepreneur_id: entrepreneur_id,
            image: imageUrl,
        };

        const result = await updateInfoExperienceService(updatedExperience);
        res.status(200).json({
            experience: updatedExperience,
            message: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating experience" });
    }
};
