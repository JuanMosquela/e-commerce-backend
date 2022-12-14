import { Router } from "express";
import { body, check } from "express-validator";
import handleErrors from "../middlewares/handleErrors.js";
import {
  sendEmail,
  signInUser,
  signUpUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  [
    check("email", "El email debe tener un valor valido").isEmail(),
    check("name", "The name is required").notEmpty(),
    check("password", "Password must be 6 digit min").isLength({ min: 6 }),
    handleErrors,
  ],
  signUpUser
);

router.post("/login", signInUser);

router.post(
  "/send-mail",
  [
    body("user", "El usuario es obligatorio").notEmpty(),
    body("email", "No es un correo valiod").isEmail(),
    body("subject", "El asunto es obligatorio").notEmpty(),
    body("description", "La descripcion es obligatoria").notEmpty(),
    handleErrors,
  ],
  sendEmail
);

export default router;
