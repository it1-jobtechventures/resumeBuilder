import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getSkills, saveSkills } from '../controllers/skillsSectionController.js';

const skillRouter = express.Router();

skillRouter.post("/add-skills", userAuth, saveSkills); // Create or update skills
skillRouter.get("/:resumeId",userAuth, getSkills); // Get skills by resumeId

export default skillRouter
