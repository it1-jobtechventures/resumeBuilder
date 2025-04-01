import { getReference, saveReference } from "../controllers/referenceSectionController.js";
import userAuth from "../middleware/userAuth.js";
import express from 'express'

const referenceRouter = express.Router();

referenceRouter.post("/add-reference", userAuth, saveReference); // Create or update reference info
referenceRouter.get("/:resumeId", userAuth, getReference); // Get reference info by resumeId

export default referenceRouter;
