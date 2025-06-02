import { Request, Response } from 'express';
import { updateUserService } from '@/services/User/updateUserService';
import { findByIdUserService } from '@/services/User/findByIdUserService';
import { uploadToAzureService } from '@/services/Farm/uploadToAzureService';

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: 'Usuario no autenticado' });
            return;
        }

        const currentUser = await findByIdUserService(userId);
        if (!currentUser) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        // Procesar imagen si existe
        let imageUrl = undefined;
        if (req.file) {
            imageUrl = await uploadToAzureService(req.file);
        }

        // Preparar datos de actualización según el rol
        const updateData: any = {};
        
        // Campos comunes que se pueden actualizar
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.phone) updateData.phone = req.body.phone;
        if (imageUrl) updateData.image = imageUrl;

        // Campos específicos según el rol
        if (currentUser.role === 'cliente' && req.body.address) {
            updateData.address = req.body.address;
        }
        if (currentUser.role === 'emprendedor' && req.body.description) {
            updateData.description = req.body.description;
        }

        // Actualizar usuario
        currentUser.update(updateData);
        const updatedUser = await updateUserService(currentUser);

        res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            user: updatedUser
        });
    } catch (error: any) {
        console.error('Error en updateUserController:', error);
        res.status(500).json({ 
            error: error.message || 'Error al actualizar el usuario' 
        });
    }
};

