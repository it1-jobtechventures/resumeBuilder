import express from 'express'
import { getLanguages, saveLanguages } from '../controllers/languagesectionController.js';

const languageRouter = express.Router();

languageRouter.post("/add-language", saveLanguages); // Create or update languages
languageRouter.get("/:resumeId", getLanguages); // Get languages by resumeId

export default languageRouter;
