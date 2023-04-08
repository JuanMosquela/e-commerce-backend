import express from "express";
import "dotenv/config.js";
import userRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/category.js";
import authRouter from "./routes/auth.js";
import searchRouter from "./routes/search.js";
import favoriteRouter from "./routes/favorite.js";
import orderRouter from "./routes/order.js";
import cartRouter from "./routes/cart.js";
import cors from "cors";
import connectDatabase from "./config/db.config.js";
import uploadRouter from "./routes/upload.js";
import cookieSession from "cookie-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import fileUpload from "express-fileupload";

export const app = express();

const PORT = process.env.PORT || 4000;
connectDatabase();

// middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["juan"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
      passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, callback) {
      console.log(profile);
      callback(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// routes

app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/search", searchRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/auth", authRouter);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/google/success",
//     failureRedirect: "/login/failed",
//   }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     console.log(req);
//     res.redirect("/");
//   }
// );

app.listen(PORT, () => {
  console.log(`Servidor escuchando al puerto ${PORT}`);
});
