import express from 'express'
import { getEducation, saveEducation } from '../controllers/educationController.js';

const educationRouter = express.Router();

educationRouter.post("/add-education", saveEducation); // Create or update education
educationRouter.get("/:resumeId", getEducation); // Get all education details by resumeId

export default educationRouter
