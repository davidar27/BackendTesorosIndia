import { Member } from '@/models/Experience/Member';
import { updateMemberService } from '@/services/Experience/Member/updateMemberService';
import { Request, Response } from 'express';

export const updateMemberController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { experience_id } = req.params
        const { age, description, profession, name } = req.body
        const member: Member = {
            age: age,
            description: description,
            experience_id: parseInt(experience_id),
            name: name,
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