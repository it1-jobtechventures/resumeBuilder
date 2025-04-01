import { getSoftwareInfo, saveSoftwareInfo } from "../controllers/softwareInfoController.js";
import userAuth from "../middleware/userAuth.js";
import express from 'express'

const softwareInfoRouter = express.Router();

softwareInfoRouter.post("/add-software", userAuth, saveSoftwareInfo); // Create or update software info
softwareInfoRouter.get("/:resumeId", userAuth, getSoftwareInfo); // Get software info by resumeId

export default softwareInfoRouter
