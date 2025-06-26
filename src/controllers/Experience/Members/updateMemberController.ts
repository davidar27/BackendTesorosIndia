import { Member } from '@/models/Experience/Member';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { updateMemberService } from '@/services/Experience/Member/updateMemberService';
import { Request, Response } from 'express';

export const updateMemberController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { member_id } = req.params
        const { age, description, profession, name } = req.body
        let imageUrl: string | undefined;
        if (req.file) {
            const uploadedUrl = await uploadToAzureService(req.file);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }
        }
        const member: Member = {
            age: age,
            description: description,
            member_id: parseInt(member_id),
            name: name,
            image: imageUrl,
            profession: profession
        }
        await updateMemberService(member);
        res.status(200).json("Integrante agregado con exito.");
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al agregar integrantes"
        });
    }
}; 