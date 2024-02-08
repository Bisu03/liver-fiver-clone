import express from "express";
import { login, logout, register } from "../controllers/auth.controllers.js";
import { userMiddleware } from "../middleware/verify.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", userMiddleware, logout)

export default router;