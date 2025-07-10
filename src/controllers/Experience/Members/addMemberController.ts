import { Member } from '@/models/Experience/Member';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { addMemberService } from '@/services/Experience/Member/addMemberService';
import { Request, Response } from 'express';

export const addMemberController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { experience_id } = req.params
        const { age, description, profession, name } = req.body
        let image: string | undefined;
        if (req.file) {
            const uploadedUrl = await uploadToAzureService(req.file);
            if (uploadedUrl) {
                image = uploadedUrl;
            }
        }
        const member: Member = {
            age: age,
            description: description,
            experience_id: parseInt(experience_id),
            name: name,
            profession: profession,
            image: image
        }
        const createdMember = await addMemberService(member);
        res.status(201).json({
            message: "Integrante agregado exitosamente",
            member: createdMember
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al agregar integrantes"
        });
    }
}; 