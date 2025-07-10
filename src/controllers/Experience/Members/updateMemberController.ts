import { Member } from '@/models/Experience/Member';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { updateMemberService } from '@/services/Experience/Member/updateMemberService';
import { getMemberRepository } from '@/repositories/Experience/Member/getMemberRepository';
import { Request, Response } from 'express';

export const updateMemberController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { memberId } = req.params
        const { age, description, profession, name } = req.body
        
        // Obtener el miembro actual
        const currentMember = await getMemberRepository(parseInt(memberId));
        
        // Validar que el miembro existe
        if (!currentMember) {
            res.status(404).json({
                error: "Integrante no encontrado"
            });
            return;
        }
        
        // Preparar los datos actualizados (solo los campos que se envían)
        const updatedMember: Member = {
            memberId: parseInt(memberId),
            age: age !== undefined ? age : currentMember.age,
            description: description !== undefined ? description : currentMember.description,
            name: name !== undefined ? name : currentMember.name,
            profession: profession !== undefined ? profession : currentMember.profession,
            image: currentMember.image, // Mantener la imagen actual por defecto
            experience_id: currentMember.experience_id
        }
        
        // Si se subió una nueva imagen
        if (req.file) {
            const uploadedUrl = await uploadToAzureService(req.file);
            if (uploadedUrl) {
                updatedMember.image = uploadedUrl;
            }
        }
        
        const updateMember = await updateMemberService(updatedMember);
        res.status(200).json({
            message: "Integrante actualizado exitosamente",
            member: updateMember
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al actualizar integrante"
        });
    }
};