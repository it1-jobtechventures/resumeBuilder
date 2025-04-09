import express from 'express'
import { getSocialMedia, saveSocialMedia } from '../controllers/socialMediaLinksController.js';

const socialLinksRouter = express.Router();

socialLinksRouter.post("/add-socialLink", saveSocialMedia); // Create or update social links
socialLinksRouter.get("/:resumeId", getSocialMedia); // Get social links by resumeId

export default socialLinksRouter;