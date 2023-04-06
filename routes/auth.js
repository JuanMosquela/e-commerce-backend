import { Router } from "express";
import { body, check } from "express-validator";
import handleErrors from "../middlewares/handleErrors.js";
import { signInUser, signUpUser } from "../controllers/auth.controller.js";
import passport from "passport";

import "dotenv/config";

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

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.post("/login", signInUser);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "https://fit-commerce.onrender.com/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     console.log(req);
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );

// router.post(
//   "/send-mail",
//   [
//     body("user", "El usuario es obligatorio").notEmpty(),
//     body("email", "No es un correo valiod").isEmail(),
//     body("subject", "El asunto es obligatorio").notEmpty(),
//     body("description", "La descripcion es obligatoria").notEmpty(),
//     handleErrors,
//   ],
//   sendEmail
// );

export default router;
