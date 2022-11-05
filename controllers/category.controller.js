import mongoose from "mongoose";
import Category from "../models/categorySchema.js";

const getCategories = async (req, res) => {
  const { limit = 10 } = req.query;
  const categories = await Category.find({ state: true }).limit(limit);

  res.json({
    categories,
  });
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const findCategory = await Category.findById(id).populate("user", "name");

    if (!findCategory) {
      return res.status(400).json({
        msg: "The ID or the category dosent exist",
      });
    }

    res.status(200).json({
      findCategory,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
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

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { user, state, ...rest } = req.body;

  rest.name = rest.name.toUpperCase();

  try {
    const categoryDB = await Category.findByIdAndUpdate(id, rest);

    if (!categoryDB) {
      return res.status(400).json({
        msg: "category dosent exist",
      });
    }

    res.status(201).json({
      categoryDB,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryDB = await Category.findByIdAndUpdate(id, { state: false });

    res.status(201).json({
      categoryDB,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
