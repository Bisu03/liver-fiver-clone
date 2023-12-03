import express from "express";
import { deleteUser, getUser } from "../controllers/user.controllers.js";
import { userMiddleware } from "../middleware/verify.js";

const router = express.Router();

router.delete("/:id", userMiddleware, deleteUser);
router.get("/:id", getUser);

export default router;