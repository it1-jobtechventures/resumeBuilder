import express from 'express'
import { getWorkExperience, saveWorkExperience } from '../controllers/workExperienceController.js';

const workExperienceRouter = express.Router();

workExperienceRouter.post("/add-workExperince" , saveWorkExperience); // Create or update Work Experience
workExperienceRouter.get("/:resumeId", getWorkExperience); // Get Work Experience by resumeId

export default workExperienceRouter