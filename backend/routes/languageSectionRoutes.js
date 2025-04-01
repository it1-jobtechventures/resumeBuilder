import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getLanguages, saveLanguages } from '../controllers/languagesectionController.js';
const languageRouter = express.Router();

languageRouter.post("/add-language", userAuth, saveLanguages); // Create or update languages
languageRouter.get("/:resumeId", userAuth, getLanguages); // Get languages by resumeId
 export default languageRouter;
