import express from 'express';
import { getAllTemplates, getSingleTemplate, uploadTemplate } from '../controllers/templateController.js';
import upload from '../middleware/uploadMiddleware.js';

const templateRouter = express.Router();

templateRouter.post('/upload', upload, uploadTemplate);
templateRouter.get('/allTemplate' , getAllTemplates)
templateRouter.get('/singleTemplate/:id', getSingleTemplate);


export default templateRouter;
