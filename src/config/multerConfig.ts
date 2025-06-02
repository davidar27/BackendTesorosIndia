import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, 
});

// Para subidas múltiples (imágenes y videos)
export const uploadFiles = upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 2 },
]);

// Para subida de un solo archivo
export const uploadSingleFile = upload.single('file');
