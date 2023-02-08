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
import Product from "./models/productSchema.js";
import products from "./data/products.js";
import uploadRouter from "./routes/upload.js";
import cookieSession from "cookie-session";
import passport from "passport";
import fileUpload from "express-fileupload";
import graphqlServer from "./graphql/products.js";

export const app = express();

const PORT = process.env.PORT || 5000;
connectDatabase();

// middlewares

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["juan"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

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

// GraphQL Server

graphqlServer.listen(PORT, () => {
  console.log(`Servidor escuchando al puerto ${PORT}`);
});
