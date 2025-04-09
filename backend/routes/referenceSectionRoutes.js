import { getReference, saveReference } from "../controllers/referenceSectionController.js";
import express from 'express'

const referenceRouter = express.Router();

referenceRouter.post("/add-reference", saveReference); // Create or update reference info
referenceRouter.get("/:resumeId", getReference); // Get reference info by resumeId

export default referenceRouter;