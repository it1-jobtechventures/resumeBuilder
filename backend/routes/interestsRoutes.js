import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getInterests, saveInterests } from '../controllers/interestsSectionController.js';


const interestsRouter = express.Router();

interestsRouter.post("/add-interest", userAuth, saveInterests); // Create or update certifications
interestsRouter.get("/:resumeId", userAuth, getInterests); // Get certifications by resumeId

export default interestsRouter;
