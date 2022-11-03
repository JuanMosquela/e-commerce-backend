import { Router } from "express";
import { check } from "express-validator";
import {
  addProduct,
  getAllProducts,
  removeProduct,
  updateProduct,
} from "../controllers/product.controller.js";

import handleErrors from "../middlewares/handleErrors.js";
const router = Router();

router.get("/", getAllProducts);

router.post(
  "/",
  [
    check("title", "The title is required").notEmpty(),
    check("price", "The price is required and must be a number")
      .notEmpty()
      .isNumeric(),
    check("description", "The description is required").notEmpty(),

    handleErrors,
  ],
  addProduct
);

router.put(
  "/:id",
  [check("id", `its not a valid Mongo ID`).isMongoId(), handleErrors],
  updateProduct
);

router.delete(
  "/:id",
  [check("id", `its not a valid Mongo ID`).isMongoId()],
  removeProduct
);

export default router;
