import { Router } from "express";
import {
  createOrder,
  createPayment,
  notification,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
const router = Router();

router.post("/", verifyToken, createOrder);

router.post("/create-payment/:id", verifyToken, createPayment);

router.post("/notification", notification);

export default router;
