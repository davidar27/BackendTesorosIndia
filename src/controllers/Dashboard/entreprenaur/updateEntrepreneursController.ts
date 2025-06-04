import { Request, Response } from 'express';
import { findByIdUserService } from '@/services/User/findByIdUserService';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { updateEntrepreneurService } from '@/services/Dashboard/entrepreneur/updateEntrepreneurService';
import { deleteFromAzureService } from '@/services/Azure/deleteFromAzureService';

export const updateEntrepreneursController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;        
        
        if (!userId) {
            res.status(401).json({ error: 'Usuario no autenticado' });
            return;
        }

        const currentUser = await findByIdUserService(Number(userId));
        if (!currentUser) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        
        if (currentUser.role !== 'emprendedor') {
            res.status(403).json({ error: 'Acceso no autorizado' });
            return;
        }

        let imageUrl = undefined;
        if (req.file) {
            imageUrl = await uploadToAzureService(req.file);

            if (imageUrl && currentUser.image) {
                try {
                    await deleteFromAzureService(currentUser.image);
                } catch (error) {
                    console.error('Error deleting previous image:', error);
                }
            }
        }

        const updateData: any = {};
        
        if (req.body.name?.trim()) {
            updateData.name = req.body.name.trim();
        }
        
        if (req.body.email?.trim()) {
            updateData.email = req.body.email.trim();
        }

        if (req.body.phone?.trim()) {
            updateData.phone = req.body.phone.trim();
        }
        
        if (imageUrl) {
            updateData.image = imageUrl;
        }
        
        if (req.body.description !== undefined) {
            updateData.description = req.body.description || ' ';
        }
        
        if (req.body.name_experience) {
            const trimmedName = req.body.name_experience.trim();
            console.log(trimmedName);
            
            
            if (!trimmedName) {
                res.status(400).json({ error: 'El nombre de la experiencia no puede estar vacío' });
                return;
            }
            updateData.name_experience = trimmedName;
        }

        if (!currentUser.userId) {
            res.status(400).json({ error: 'ID de usuario no válido' });
            return;
        }

        const changedFields = await updateEntrepreneurService({
            ...updateData,
            userId: currentUser.userId
        });

        res.status(200).json({
            message: 'Emprendedor actualizado exitosamente',
            updatedFields: changedFields
        });
    } catch (error: any) {
        console.error('Error en updateEntrepreneurController:', error);
        res.status(500).json({ 
            error: error.message || 'Error al actualizar el emprendedor' 
        });
    }
}; 