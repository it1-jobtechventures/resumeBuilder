import { Router } from "express";
import { aiGenerate, aiInternshipExperience, aiProject, aiWorkExperience } from "../controllers/aiController.js";

const aiRouter = Router();

aiRouter.post("/generate-summary", aiGenerate);
aiRouter.post('/generate-jobdescription', aiWorkExperience)
aiRouter.post('/generate-internshipdescription', aiInternshipExperience)
aiRouter.post('/generate-projectDes', aiProject)

export default aiRouter;
