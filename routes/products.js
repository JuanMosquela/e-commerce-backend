import { Router } from "express";
import { check } from "express-validator";
import {
  addProduct,
  addReview,
  getAllProducts,
  getProduct,
  getProductReviews,
  getTopRatedProducts,
  removeProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { categoryIDExist, productIDExist } from "../helpers/db-validators.js";

import handleErrors from "../middlewares/handleErrors.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/verify-token.js";
const router = Router();

router.get("/", getAllProducts);

router.get("/rated", getTopRatedProducts);

router.get(
  "/:id",
  [check("id").isMongoId(), check("id").custom(productIDExist), handleErrors],
  getProduct
);

router.post(
  "/",
  [
    verifyToken,
    check("title", "The title is required").notEmpty(),
    check("category").notEmpty(),
    check("category").custom(categoryIDExist),
    handleErrors,
  ],
  addProduct
);

router.put(
  "/:id",
  [
    verifyToken,
    check("id", `its not a valid Mongo ID`).isMongoId(),
    check("id").custom(productIDExist),
    handleErrors,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    verifyToken,
    verifyTokenAndAdmin,
    check("id", `its not a valid Mongo ID`).isMongoId(),
    check("id").custom(productIDExist),
    handleErrors,
  ],
  removeProduct
);

//buscar reviews de un producto

router.get("/reviews/:id", getProductReviews);

router.put("/reviews/:id", addReview);

export default router;
