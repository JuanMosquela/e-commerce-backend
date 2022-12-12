import express from "express";
import "dotenv/config.js";
import userRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/category.js";
import authRouter from "./routes/auth.js";
import searchRouter from "./routes/search.js";
import favoriteRouter from "./routes/favorite.js";
import cors from "cors";
import connectDatabase from "./config/db.config.js";
import Product from "./models/productSchema.js";
import products from "./data/products.js";
import cookieSession from "cookie-session";
import passport from "passport";
// import passportSetup from "./passport.js";

const app = express();

const PORT = process.env.PORT || 5000;
connectDatabase();

// middlewares

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["juan"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes

app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/search", searchRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/insertProducts", async (req, res) => {
  const insertedProducts = await Product.insertMany(products);
  res.json({
    insertedProducts,
  });
});
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando al puerto ${PORT}`);
});
