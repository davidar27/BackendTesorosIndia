import { generateSasUrl } from "@/services/Azure/generateSasUrlService";

export const convertToSasUrl = async (blobUrl: string | null): Promise<string | null> => {
    if (!blobUrl) return null;

    try {
        const urlWithoutParams = blobUrl.split('?')[0];
        
        const blobName = urlWithoutParams.split('/multimedia/').pop();
        if (!blobName) return null;

        const decodedBlobName = decodeURIComponent(blobName);
        
        return await generateSasUrl(decodedBlobName);
    } catch (error) {
        console.error('Error converting to SAS URL:', error);
        return null;
    }
}; 