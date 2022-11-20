import { Router } from "express";
import mongoose from "mongoose";
import Category from "../models/categorySchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

const router = Router();

router.get("/", async (req, res) => {
  const { search } = req.query;

  const regex = new RegExp(search, "i");

  try {
    const findProducts = await Product.find({
      $or: [{ title: regex }, { category: regex }],
    });

    res.json({
      findProducts,
    });
  } catch (error) {}
});

router.get("/filter/products/", async (req, res) => {
  const { category = "", branch = "", min = 0, max = 200000 } = req.query;

  console.log(category);
  const regex = new RegExp(category, "i");

  try {
    const findCategory = await Product.find({ category: regex });

    const findProducts = await Product.find({
      // category: new RegExp(category, "i"),
      category: regex,
      $or: [
        {
          $and: [
            { category },
            { price: { $gte: Number(min) } },
            { price: { $lte: Number(max) } },
          ],
        },
      ],
    });

    res.json({
      findProducts,
    });
  } catch (error) {}
});

export default router;
