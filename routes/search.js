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

// const validCollections = ["users", "categories", "products"];

// const searchUsers = async (term = "", res) => {
//   const isMongoId = mongoose.Types.ObjectId.isValid(term);

//   if (isMongoId) {
//     const user = await User.findById(term);
//     return res.status(200).json({
//       results: user ? user : [],
//     });
//   }

//   const regex = new RegExp(term, "i");

//   const user = await User.find({
//     $or: [{ name: regex }, { email: regex }],
//     $and: [{ state: true }],
//   });

//   if (user) {
//     return res.status(200).json({
//       results: user ? user : [],
//     });
//   }
// };

// const searchProducts = async (name = "", category = "", res) => {
//   const isMongoId = mongoose.Types.ObjectId.isValid(name);

//   console.log(name);
//   console.log(category);

//   if (isMongoId) {
//     const product = await Product.findById(name);
//     return res.status(200).json({
//       results: product ? product : [],
//     });
//   }

//   const regex = new RegExp(name, "i");

//   const product = await Product.find({
//     $or: [{ title: regex }],
//     $and: [{ state: true }],
//   });

//   if (product) {
//     return res.status(200).json({
//       results: product ? product : [],
//     });
//   }
// };

// const searchCategory = async (name = "", res) => {
//   const isMongoId = mongoose.Types.ObjectId.isValid(term);

//   if (isMongoId) {
//     const category = await Category.findById(term);
//     return res.status(200).json({
//       results: category ? category : [],
//     });
//   }

//   const regex = new RegExp(term, "i");

//   const category = await Category.find({ name: regex, state: true });

//   if (category) {
//     return res.status(200).json({
//       results: category ? category : [],
//     });
//   }
// };

// router.get("/:collection/", (req, res) => {
//   const { collection } = req.params;
//   const { name, category } = req.query;

//   if (!validCollections.includes(collection)) {
//     res.status(400).json({
//       msg: `Collection invalid, try using ${validCollections} `,
//     });
//   }

//   switch (collection) {
//     case "users":
//       searchUsers(term, res);
//       break;
//     case "products":
//       searchProducts(name, category, res);
//       break;

//     case "categories":
//       searchCategory(term, res);
//       break;
//     default:
//       res.status(500).json({
//         msg: "Error",
//       });
//       break;
//   }
// });

export default router;
