import { Router } from "express";
import { check } from "express-validator";
import handleErrors from "../middlewares/handleErrors.js";
import { addUser, login } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  [
    check("email", "El email debe tener un valor valido").isEmail(),
    check("name", "The name is required").notEmpty(),
    check("password", "Password must be 6 digit min").isLength({ min: 6 }),
    handleErrors,
  ],
  addUser
);

router.post("/login", login);

export default router;
