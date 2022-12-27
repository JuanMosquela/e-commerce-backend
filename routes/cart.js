import { Router } from "express";
import { addProductToCart, getCart } from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
const router = Router();

router.get("/", verifyToken, getCart);

router.post("/", verifyToken, addProductToCart);

export default router;
