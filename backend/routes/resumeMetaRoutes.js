// import express from 'express'
// import { createResume, getUserResumes, updateResumeStatus } from '../controllers/resumeMetaController.js';
// const resumeMetaRouter = express.Router();
// resumeMetaRouter.post("/create", createResume);
// resumeMetaRouter.get("/user/:userId", getUserResumes);
// resumeMetaRouter.put("/update/:resumeId",updateResumeStatus);
// export default resumeMetaRouter;

import express from "express";
import { createResumeMeta, getAllResumeMetas, getResumeMetaById, markResumeAsDownloaded} from "../controllers/resumeMetaController.js";

const resumeMetaRouter = express.Router();

// Create a new resume meta
resumeMetaRouter.post("/create", createResumeMeta);

// Get all resume metas for a user
resumeMetaRouter.get("/user/:userId", getAllResumeMetas);

// Get a single resume meta by ID
resumeMetaRouter.get("/:resumeMetaId", getResumeMetaById);

// Mark a resume as downloaded
resumeMetaRouter.patch("/download/:resumeMetaId", markResumeAsDownloaded);

export default resumeMetaRouter;
