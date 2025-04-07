import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, 
});

export const uploadFiles = upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 2 },
]);
