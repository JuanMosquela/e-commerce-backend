import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
const router = Router();

router.post("/", verifyToken, createOrder);

export default router;
