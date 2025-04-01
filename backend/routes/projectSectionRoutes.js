import express from 'express'
import { getProjects, saveProject } from '../controllers/projectSectionController.js';
import userAuth from '../middleware/userAuth.js';
const projectSectionRouter = express.Router();

projectSectionRouter.post("/add-project", userAuth, saveProject); // Create or update a project
projectSectionRouter.get("/:resumeId", getProjects); // Get all projects by resumeId

export default projectSectionRouter;
