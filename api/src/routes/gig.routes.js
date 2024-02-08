import express from "express";
import { createGig, deleteGig, getGig, getGigs } from "../controllers/gig.controllers.js";
import { userMiddleware } from "../middleware/verify.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", userMiddleware, upload.single('files'), createGig);
router.delete("/:id", userMiddleware, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

export default router;