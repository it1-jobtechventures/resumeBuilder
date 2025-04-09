import express from 'express'
import { getCertifications, saveCertifications } from '../controllers/certificateController.js';

const certificateRouter = express.Router();

certificateRouter.post("/add-certificate", saveCertifications); // Create or update certifications
certificateRouter.get("/:resumeId", getCertifications); // Get certifications by resumeId

export default certificateRouter;
