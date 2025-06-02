import express from 'express';
import { serveImageController } from '@/controllers/Azure/serveImageController';

const router = express.Router();

router.get('/:blobName', serveImageController);

export default router; 