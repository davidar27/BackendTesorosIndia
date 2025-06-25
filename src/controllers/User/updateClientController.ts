import { Request, Response } from 'express';
import { updateClientService } from '@/services/User/updateClientService';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';

export const updateClientController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const userId = Number(id);

        
        if (!userId) {
            res.status(401).json({ error: 'Usuario no autenticado' });
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
            userId: Number(userId),
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