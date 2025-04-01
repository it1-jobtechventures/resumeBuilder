import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getSocialMedia, saveSocialMedia } from '../controllers/socialMediaLinksController.js';

const socialLinksRouter = express.Router();

socialLinksRouter.post("/add-socialLink", userAuth, saveSocialMedia); // Create or update social links
socialLinksRouter.get("/:resumeId", userAuth, getSocialMedia); // Get social links by resumeId

export default socialLinksRouter;
