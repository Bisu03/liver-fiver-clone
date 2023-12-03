import express from "express";
import { userMiddleware } from "../middleware/verify.js";
import { createReview, deleteReview, getReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", userMiddleware, createReview)
router.get("/:gigId", getReviews)
router.delete("/:id", userMiddleware, deleteReview)

export default router;