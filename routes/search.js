import { Router } from "express";
import mongoose from "mongoose";
import User from "../models/userSchema.js";

const router = Router();

const validCollections = ["users", "categories", "products"];

const handleSearch = async (term = "", res) => {
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
  });

  if (user) {
    return res.status(200).json({
      results: user ? user : [],
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
      handleSearch(term, res);
      break;
    case "products":
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
