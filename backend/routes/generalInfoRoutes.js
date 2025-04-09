import express from 'express';
import { getGeneralInfo, saveGeneralInfo } from '../controllers/generalInfoController.js';

const generalInfoRouter = express.Router();

generalInfoRouter.post('/add-generalInfo',saveGeneralInfo);
generalInfoRouter.get('/:resumeId' , getGeneralInfo)

export default generalInfoRouter;
