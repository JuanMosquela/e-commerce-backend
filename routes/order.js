import { Router } from "express";
import { createOrder, createPayment } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
const router = Router();

router.post("/", verifyToken, createOrder);

router.post("/payment", verifyToken, createPayment);

export default router;
