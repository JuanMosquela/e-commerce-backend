import { Router } from "express";

import {
  addFavProduct,
  removeFavProduct,
} from "../controllers/favorite.controller.js";
import { getUserFavorites } from "../controllers/user.controller.js";

const router = Router();

router.get("/:id", getUserFavorites);

router.post("/:id", addFavProduct);

router.put("/:id", removeFavProduct);

export default router;
