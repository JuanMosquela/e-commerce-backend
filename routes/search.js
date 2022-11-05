import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

const router = Router();

const validCollections = ["users", "categories", "products"];

const searchUsers = async (term = "", res) => {
  const isMongoId = mongoose.Types.ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.status(200).json({
      results: user ? user : [],
    });
  }

  const regex = new RegExp(term, "i");

  const user = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  if (user) {
    return res.status(200).json({
      results: user ? user : [],
    });
  }
};

const searchProducts = async (term = "", res) => {
  const isMongoId = mongoose.Types.ObjectId.isValid(term);

  if (isMongoId) {
    const product = await Product.findById(term);
    return res.status(200).json({
      results: product ? product : [],
    });
  }

  const regex = new RegExp(term, "i");

  const product = await Product.find({ title: regex, $and: [{ state: true }] });

  if (product) {
    return res.status(200).json({
      results: product ? product : [],
    });
  }
};

router.get("/:collection/:term", (req, res) => {
  const { collection, term } = req.params;

  if (!validCollections.includes(collection)) {
    res.status(400).json({
      msg: `Collection invalid, try using ${validCollections} `,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;

    case "categories":
      break;
    default:
      res.status(500).json({
        msg: "Error",
      });
      break;
  }
});

export default router;
