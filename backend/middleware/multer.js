import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cloudinary config should already be initialized
// from your `cloudinary.js` file

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: '/photos', // You can customize the folder name
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage });

export default upload;
