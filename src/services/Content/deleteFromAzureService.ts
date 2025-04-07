import { containerClient } from "../../config/azure";

export const deleteFromAzureService = async (fileUrl: string) => {
    try {

        const blobName = fileUrl.split('/').pop();
        if (!blobName) return;
        
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.delete();
    } catch (error) {
        console.error("Error al eliminar archivo de Azure:", error);
        throw new Error("Error al eliminar archivo de Azure");
    }
};