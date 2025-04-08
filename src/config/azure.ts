import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME || "";

export const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
export const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);
