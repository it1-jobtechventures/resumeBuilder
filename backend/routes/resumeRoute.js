import express from 'express'
import { createResume, getDraftResumes, getResumeById, getUserResumes, transferTempResumesToUser, updateResume } from '../controllers/resumeControllers.js';
import userAuth from '../middleware/userAuth.js';

const resumeRouter = express.Router();

// Create a resume (draft or final)
resumeRouter.post("/create", createResume);

// Get all resumes for a user
resumeRouter.get("/user/:userId", getUserResumes);

// Get single resume by ID
resumeRouter.get("/:resumeId",getResumeById );

// Update resume
resumeRouter.put("/update/:resumeId",updateResume);

resumeRouter.post('/convert-user' , transferTempResumesToUser)

resumeRouter.post('/draft' ,userAuth, getDraftResumes)


export default resumeRouter
