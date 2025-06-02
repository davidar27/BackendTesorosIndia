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
        console.log('Attempting to delete blob:', decodedBlobName);

        const blockBlobClient = containerClient.getBlockBlobClient(decodedBlobName);
        const exists = await blockBlobClient.exists();
        
        if (!exists) {
            console.log('Blob does not exist:', decodedBlobName);
            return;
        }

        await blockBlobClient.delete();
        console.log('Blob deleted successfully:', decodedBlobName);
    } catch (error) {
        console.error("Error al eliminar archivo de Azure:", error);
        throw new Error("Error al eliminar archivo de Azure");
    }
};
