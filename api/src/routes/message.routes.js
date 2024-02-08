import express from "express";
import {
    createMessage,
    getMessages,
} from "../controllers/message.controllers.js";
import { userMiddleware } from "../middleware/verify.js";

const router = express.Router();

router.post("/", userMiddleware, createMessage);
router.get("/:id", userMiddleware, getMessages);

export default router;