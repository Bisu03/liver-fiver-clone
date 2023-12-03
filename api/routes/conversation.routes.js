import express from "express";
import {
    createConversation,
    getConversations,
    getSingleConversation,
    updateConversation,
} from "../controllers/conversation.controllers.js";
import { userMiddleware } from "../middleware/verify.js";

const router = express.Router();

router.get("/", userMiddleware, getConversations);
router.post("/", userMiddleware, createConversation);
router.get("/single/:id", userMiddleware, getSingleConversation);
router.put("/:id", userMiddleware, updateConversation);

export default router;