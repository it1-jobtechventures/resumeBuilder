import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getCertifications, saveCertifications } from '../controllers/certificateController.js';

const certificateRouter = express.Router();

certificateRouter.post("/add-certificate", userAuth, saveCertifications); // Create or update certifications
certificateRouter.get("/:resumeId", userAuth, getCertifications); // Get certifications by resumeId

export default certificateRouter;
