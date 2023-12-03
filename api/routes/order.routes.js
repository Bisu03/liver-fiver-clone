import express from "express";
import { getOrders, intent, confirm } from "../controllers/order.controllers.js";
import { userMiddleware } from "../middleware/verify.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", userMiddleware, getOrders);
router.post("/create-payment-intent/:id", userMiddleware, intent);
router.put("/", userMiddleware, confirm);

export default router;