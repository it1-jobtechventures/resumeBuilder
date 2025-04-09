import { getVolunteerings, saveVolunteering } from "../controllers/volunteeringController.js";
import express from 'express'

const volunteeringRouter = express.Router();

volunteeringRouter.post("/add-volunteering", saveVolunteering); // Create or update software info
volunteeringRouter.get("/:resumeId", getVolunteerings); // Get software info by resumeId

export default volunteeringRouter