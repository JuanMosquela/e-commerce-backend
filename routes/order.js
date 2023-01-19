import { Router } from "express";
import {
  createPayment,
  getUserOrders,
  notification,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
const router = Router();

router.get("/:id", verifyToken, getUserOrders);

router.post("/create-payment/:id", verifyToken, createPayment);

router.post("/notification", notification);

export default router;
