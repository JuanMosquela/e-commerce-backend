import { Router } from "express";
import { check } from "express-validator";
import {
  getAllUsers,
  getUser,
  removeUser,
  updateUser,
} from "../controllers/user.controller.js";
import { idExist } from "../helpers/db-validators.js";
import handleErrors from "../middlewares/handleErrors.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/verify-token.js";
const router = Router();

router.get(
  "/:id",
  [
    verifyToken,
    check("id", `its not a valid Mongo ID`).isMongoId(),
    check("id").custom(idExist),
  ],
  getUser
);

router.get("/", [verifyToken, verifyTokenAndAdmin], getAllUsers);

router.put(
  "/:id",
  [
    verifyToken,

    check("id", `its not a valid Mongo ID`).isMongoId(),
    check("id").custom(idExist),
    handleErrors,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    // verifyToken,
    // verifyTokenAndAdmin,
    check("id", `its not a valid Mongo ID`).isMongoId(),
    check("id").custom(idExist),
  ],
  removeUser
);

export default router;
