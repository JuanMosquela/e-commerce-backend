import { Router } from "express";
import {
  addProductToCart,
  emptyCart,
  getCart,
  removeProduct,
  updateProductQuantity,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
const router = Router();

router.get("/", verifyToken, getCart);

router.post("/", verifyToken, addProductToCart);

router.put("/:id", verifyToken, updateProductQuantity);

router.delete("/:id", verifyToken, removeProduct);

router.delete("/", verifyToken, emptyCart);

export default router;
