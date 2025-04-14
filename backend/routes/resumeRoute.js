import express from 'express'
import { createResume, getResumeById, getUserResumes, transferTempResumesToUser, updateResume } from '../controllers/resumeControllers.js';

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

export default resumeRouter
