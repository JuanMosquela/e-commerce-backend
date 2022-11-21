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
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});

router.get("/filter/products/", async (req, res) => {
  const { category, branch, min, max } = req.query;

  console.log(category);

  try {
    const findProducts = await Product.find({
      category: new RegExp(category, "i"),

      $or: [
        {
          $and: [
            { price: { $gte: Number(min) | 1 } },
            { price: { $lte: Number(max) || 999999 } },
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
