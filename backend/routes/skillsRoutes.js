import express from 'express'
import { getSkills, saveSkills } from '../controllers/skillsSectionController.js';

const skillRouter = express.Router();

skillRouter.post("/add-skills", saveSkills); // Create or update skills
skillRouter.get("/:resumeId", getSkills); // Get skills by resumeId

export default skillRouter