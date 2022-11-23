import { Router } from "express";
import { check } from "express-validator";
import handleErrors from "../middlewares/handleErrors.js";
import { addUser, login } from "../controllers/auth.controller.js";
import passport from "passport";

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

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    msg: "Log in fai",
  });
});
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      msg: "User loged in successfully",
    });
  } else {
    res.status(403).json({
      error: true,
      msg: "Not Authorized",
    });
  }
  res.status(401).json({
    error: true,
    msg: "Log in successfully",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout(), res.redirect(process.env.CLIENT_URL);
});

router.post("/login", login);

export default router;
