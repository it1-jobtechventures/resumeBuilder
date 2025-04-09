import express from 'express'
import { getInterests, saveInterests } from '../controllers/interestsSectionController.js';

const interestsRouter = express.Router();

interestsRouter.post("/add-interest", saveInterests); // Create or update certifications
interestsRouter.get("/:resumeId", getInterests); // Get certifications by resumeId

export default interestsRouter;
