import { Request, Response } from 'express';
import { blobServiceClient } from '@/config/azure';

export const serveImageController = async (req: Request, res: Response): Promise<void> => {
    try {
        const blobName = req.params.blobName;
        if (!blobName) {
            res.status(400).send('Blob name is required');
            return;
        }

        const containerClient = blobServiceClient.getContainerClient('multimedia');
        const blobClient = containerClient.getBlobClient(blobName);

        // Verificar si el blob existe
        const exists = await blobClient.exists();
        if (!exists) {
            res.status(404).send('Image not found');
            return;
        }

        const downloadBlockBlobResponse = await blobClient.download(0);
        
        // Establecer headers apropiados
        res.setHeader('Content-Type', downloadBlockBlobResponse.contentType || 'application/octet-stream');
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache por 1 año
        
        // Transmitir la imagen al cliente
        if (downloadBlockBlobResponse.readableStreamBody) {
            downloadBlockBlobResponse.readableStreamBody.pipe(res);
        } else {
            res.status(500).send('Error reading image stream');
        }
    } catch (error) {
        console.error('Error serving image:', error);
        res.status(500).send('Error serving image');
    }
}; 