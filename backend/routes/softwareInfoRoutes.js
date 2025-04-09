import { getSoftwareInfo, saveSoftwareInfo } from "../controllers/softwareInfoController.js";
import express from 'express'

const softwareInfoRouter = express.Router();

softwareInfoRouter.post("/add-software", saveSoftwareInfo); // Create or update software info
softwareInfoRouter.get("/:resumeId", getSoftwareInfo); // Get software info by resumeId

export default softwareInfoRouter
