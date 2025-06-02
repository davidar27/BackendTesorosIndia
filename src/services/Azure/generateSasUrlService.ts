import { BlobServiceClient, generateBlobSASQueryParameters, SASProtocol, BlobSASPermissions, StorageSharedKeyCredential } from '@azure/storage-blob';


export const generateSasUrl = async (blobName: string): Promise<string> => {
    try {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error('Azure Storage connection string is not configured');
        }

        // Extraer accountName y accountKey del connection string
        const accountName = connectionString.match(/AccountName=([^;]+)/)?.[1];
        const accountKey = connectionString.match(/AccountKey=([^;]+)/)?.[1];

        if (!accountName || !accountKey) {
            throw new Error('Invalid storage account credentials');
        }

        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient('multimedia');
        const blobClient = containerClient.getBlobClient(blobName);

        const sasOptions = {
            containerName: 'multimedia',
            blobName: blobName,
            permissions: BlobSASPermissions.parse('r'), // Usar BlobSASPermissions en lugar de string
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hora de validez
            protocol: SASProtocol.Https
        };

        const sasToken = generateBlobSASQueryParameters(
            sasOptions,
            sharedKeyCredential
        ).toString();

        return `${blobClient.url}?${sasToken}`;
    } catch (error) {
        console.error('Error generating SAS URL:', error);
        throw new Error('Error generating secure access URL for blob');
    }
}; 