import express from "express";
import "dotenv/config.js";
import userRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import cors from "cors";

import path, { join } from "path";
import connectDatabase from "./config/db.config.js";

// import Product from "./models/productSchema.js";
// import products from "./data/products.js";

const app = express();

const PORT = process.env.PORT || 5000;
connectDatabase();

app.use(cors());
app.use(express.json());
// app.use(express.static(join(__dirname, "/frontend/build")));
app.use("/api/user", userRouter);
app.use("/api/product", productsRouter);
// app.use("/insertProducts", async (req, res) => {
//   await Product.remove({});
//   const insertedProducts = await Product.insertMany(products);
//   res.json({
//     insertedProducts,
//   });
// });
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando al puerto ${PORT}`);
});
