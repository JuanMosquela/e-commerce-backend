import { Router } from "express";

import {
  addFavProduct,
  removeFavProduct,
} from "../controllers/favorite.controller.js";
import { getUserFavorites } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";

const router = Router();

router.get("/:id", getUserFavorites);

router.post("/:id", verifyToken, addFavProduct);

router.put("/:id", verifyToken, removeFavProduct);

export default router;
