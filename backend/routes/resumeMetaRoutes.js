import express from 'express'
import { createResume, getUserResumes, updateResumeStatus } from '../controllers/resumeMetaController.js';
const resumeMetaRouter = express.Router();
resumeMetaRouter.post("/create", createResume);
resumeMetaRouter.get("/user/:userId", getUserResumes);
resumeMetaRouter.put("/update/:resumeId",updateResumeStatus);
export default resumeMetaRouter;
