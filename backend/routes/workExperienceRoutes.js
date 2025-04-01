import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getWorkExperience, saveWorkExperience } from '../controllers/workExperienceController.js';

const workExperienceRouter = express.Router();

workExperienceRouter.post("/add-workExperince",userAuth , saveWorkExperience); // Create or update Work Experience
workExperienceRouter.get("/:resumeId", userAuth, getWorkExperience); // Get Work Experience by resumeId

export default workExperienceRouter
