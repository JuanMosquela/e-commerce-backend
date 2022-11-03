import { Router } from "express";
import { check } from "express-validator";
import {
  emailExist,
  nameExist,
  passwordExist,
} from "../helpers/db-validators.js";
import handleErrors from "../middlewares/handleErrors.js";

import { addUser, login } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  [
    check("email", "El email debe tener un valor valido").isEmail(),
    check("email").custom(emailExist),
    check("name", "The name is required").notEmpty(),
    check("name").custom(nameExist),
    check("password", "Password must be 6 digit min").isLength({ min: 6 }),
    check("password").custom(passwordExist),
    handleErrors,
  ],
  addUser
);

router.post("/login", login);

export default router;
