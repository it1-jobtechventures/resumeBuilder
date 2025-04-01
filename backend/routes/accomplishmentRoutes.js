import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getAccomplishment, saveAccomplishment } from '../controllers/accomplishmentController.js';



const accomplishmentsRouter = express.Router();

accomplishmentsRouter.post("/add-accomplishment", userAuth, saveAccomplishment); // Create or update certifications
accomplishmentsRouter.get("/:resumeId", userAuth, getAccomplishment); // Get certifications by resumeId

export default accomplishmentsRouter;
