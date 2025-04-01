
import { getVolunteerings, saveVolunteering } from "../controllers/volunteeringController.js";
import userAuth from "../middleware/userAuth.js";
import express from 'express'

const volunteeringRouter = express.Router();

volunteeringRouter.post("/add-volunteering", userAuth, saveVolunteering); // Create or update software info
volunteeringRouter.get("/:resumeId", userAuth, getVolunteerings); // Get software info by resumeId

export default volunteeringRouter
