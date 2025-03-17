import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/templates');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage , limits: { fileSize: 10000000 },});

export default upload.fields([
    { name: 'htmlFile', maxCount: 1 },
    { name: 'cssFile', maxCount: 1 },
    { name: 'jsFile', maxCount: 1 },
    { name: 'previewImage', maxCount: 1 }
]);
