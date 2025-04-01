
import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getEducation, saveEducation } from '../controllers/educationController.js';

const educationRouter = express.Router();

educationRouter.post("/add-education", userAuth, saveEducation); // Create or update education
educationRouter.get("/:resumeId", userAuth, getEducation); // Get all education details by resumeId

export default educationRouter
