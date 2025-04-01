import { getInternships, saveInternship } from "../controllers/internshipExperienceController.js";
import userAuth from "../middleware/userAuth.js";
import express from 'express'
const internshipExperienceRouter = express.Router();

internshipExperienceRouter.post("/add-internship", userAuth, saveInternship); // Create or update internships
internshipExperienceRouter.get("/:resumeId", userAuth, getInternships); // Get internships by resumeId
 export default internshipExperienceRouter;
