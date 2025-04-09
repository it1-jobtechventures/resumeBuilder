import express from 'express'
import { getAccomplishment, saveAccomplishment } from '../controllers/accomplishmentController.js';

const accomplishmentsRouter = express.Router();

accomplishmentsRouter.post("/add-accomplishment",  saveAccomplishment); // Create or update certifications
accomplishmentsRouter.get("/:resumeId",  getAccomplishment); // Get certifications by resumeId

export default accomplishmentsRouter;
