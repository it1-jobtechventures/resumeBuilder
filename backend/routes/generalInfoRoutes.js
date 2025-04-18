import express from 'express';
import { getGeneralInfo, saveGeneralInfo } from '../controllers/generalInfoController.js';
import upload from '../middleware/multer.js';

const generalInfoRouter = express.Router();

generalInfoRouter.post('/add-generalInfo',upload.single("photo"),saveGeneralInfo);
generalInfoRouter.get('/:resumeId' , getGeneralInfo)

export default generalInfoRouter;
