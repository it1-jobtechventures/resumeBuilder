 import express from 'express';
import { getGeneralInfo, saveGeneralInfo } from '../controllers/generalInfoController.js';
import userAuth from '../middleware/userAuth.js';

 const generalInfoRouter = express.Router();
 
 generalInfoRouter.post('/add-generalInfo',userAuth,saveGeneralInfo);
 generalInfoRouter.get('/:resumeId' , getGeneralInfo)
 
 export default generalInfoRouter;
