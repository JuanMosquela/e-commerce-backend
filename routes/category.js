import { Router } from "express";
import { check } from "express-validator";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { categoryExist } from "../helpers/db-validators.js";
import handleErrors from "../middlewares/handleErrors.js";
import { verifyToken } from "../middlewares/verify-token.js";

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post(
  "/",
  [
    verifyToken,
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(categoryExist),
    handleErrors,
  ],
  createCategory
);

router.put("/:id", updateCategory);

router.delete("/:id", updateCategory);

export default router;
