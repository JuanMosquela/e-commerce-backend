import { Router } from "express";
import { check } from "express-validator";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { categoryExist, categoryIDExist } from "../helpers/db-validators.js";
import handleErrors from "../middlewares/handleErrors.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/verify-token.js";

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [check("id", "its not a valid Mongo ID").isMongoId(), handleErrors],
  getCategory
);

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

router.put(
  "/:id",
  [
    verifyToken,
    check("id", "its not a valid mogno id").isMongoId(),
    check("id").custom(categoryIDExist),
    check("name", "The name field is required").notEmpty(),
    handleErrors,
  ],
  updateCategory
);

router.delete(
  "/:id",
  verifyToken,
  verifyTokenAndAdmin,
  [
    check("id", "its not a valid mogno id").isMongoId(),
    check("id").custom(categoryIDExist),
    handleErrors,
  ],
  deleteCategory
);

export default router;
