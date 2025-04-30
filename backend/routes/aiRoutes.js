import { Router } from "express";
import { aiGenerate, aiInternshipExperience, aiWorkExperience } from "../controllers/aiController.js";

const aiRouter = Router();

aiRouter.post("/generate-summary", aiGenerate);
aiRouter.post('/generate-jobdescription', aiWorkExperience)
aiRouter.post('/generate-internshipdescription', aiInternshipExperience)

export default aiRouter;
