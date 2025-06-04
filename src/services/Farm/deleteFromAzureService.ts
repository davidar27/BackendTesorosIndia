import { containerClient } from "@/config/azure";

export const deleteFromAzureService = async (fileUrl: string) => {
    try {
        // Extraer el nombre del blob de la URL
        // La URL puede ser /images/[blobname] o el nombre del blob directamente
        const blobName = fileUrl.startsWith('/images/') 
            ? fileUrl.replace('/images/', '')
            : fileUrl.split('/multimedia/').pop() || fileUrl;

        if (!blobName) {
            throw new Error('Invalid blob URL');
        }

        // Decodificar el nombre del blob
        const decodedBlobName = decodeURIComponent(blobName).replace(/%20/g, ' ');

        const blockBlobClient = containerClient.getBlockBlobClient(decodedBlobName);
        const exists = await blockBlobClient.exists();
        
        if (!exists) {
            return;
        }

        await blockBlobClient.delete();
    } catch (error) {
        console.error("Error al eliminar archivo de Azure:", error);
        throw new Error("Error al eliminar archivo de Azure");
    }
};
