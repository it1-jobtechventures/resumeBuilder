import { getInternships, saveInternship } from "../controllers/internshipExperienceController.js";
import express from 'express'

const internshipExperienceRouter = express.Router();

internshipExperienceRouter.post("/add-internship", saveInternship); // Create or update internships
internshipExperienceRouter.get("/:resumeId", getInternships); // Get internships by resumeId

export default internshipExperienceRouter;
