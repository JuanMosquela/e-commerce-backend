import Product from "../models/productSchema.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      msg: "products desde el get",
      products,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const addProduct = async (req, res) => {
  const {
    title,
    price,
    pictureURL,
    description,
    stock,
    rating,
    reviews,
    numReviews,
  } = req.body;

  try {
    const product = new Product({
      title,
      price,
      pictureURL,
      description,
      stock,
      rating,
      reviews,
      numReviews,
    });

    product.save();

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { title, price, pictureURL, description, stock } = req.body;

  console.log(id);
  try {
    const product = await Product.findByIdAndUpdate(id, {
      title,
      price,
      pictureURL,
      description,
      stock,
    });
    res.status(200).json({
      msg: "Product actualizado",
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({
      msg: "User removed from database",
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export { getAllProducts, addProduct, updateProduct, removeProduct };
