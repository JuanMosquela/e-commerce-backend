import mongoose from "mongoose";
import Category from "../models/categorySchema.js";

const getCategories = async (req, res) => {
  const { limit = 10 } = req.query;
  const categories = await Category.find().limit(limit);

  res.send({
    categories,
  });
};

const getCategory = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: "get category",
  });
};

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();

  try {
    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
      return res.status(400).json({
        msg: "category already exist",
      });
    }

    const data = {
      name,
      user: req.user._id,
    };

    const category = new Category(data);
    await category.save();

    res.status(201).json({
      category,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: "update category",
  });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: "delete category",
  });
};

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
