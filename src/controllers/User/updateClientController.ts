import { Request, Response } from 'express';
import { updateClientService } from '@/services/User/updateClientService';
import { findByIdUserService } from '@/services/User/findByIdUserService';
import { uploadToAzureService } from '@/services/Farm/uploadToAzureService';

export const updateClientController = async (req: Request, res: Response): Promise<void> => {
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

        if (currentUser.role !== 'cliente') {
            res.status(403).json({ error: 'Acceso no autorizado' });
            return;
        }

        let imageUrl: string | undefined;
        if (req.file) {
            const uploadedUrl = await uploadToAzureService(req.file);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }
        }

        const updateData = {
            userId,
            ...(req.body.name && { name: req.body.name }),
            ...(req.body.phone && { phone: req.body.phone }),
            ...(imageUrl && { image: imageUrl }),
            ...(req.body.address && { address: req.body.address })
        };

        const updatedUser = await updateClientService(updateData);

        res.status(200).json({
            message: 'Cliente actualizado exitosamente',
            user: updatedUser
        });
    } catch (error: any) {
        console.error('Error en updateClientController:', error);
        res.status(500).json({ 
            error: error.message || 'Error al actualizar el cliente' 
        });
    }
}; 