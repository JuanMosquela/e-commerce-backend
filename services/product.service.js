import Product from "../models/productSchema.js";

const findProductById = async (id) => {
  try {
    const product = await Product.findById(id).populate("owner");
    return product;
  } catch (error) {
    console.log(error);
  }
};
const findProductByName = async (title) => {
  try {
    const productInDB = await Product.findOne({ title });

    return productInDB;
  } catch (error) {
    console.log(error);
  }
};

const findProductByIdAndUpdate = async (req, id) => {
  try {
    const { title, category, branch, stock, description, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        price,
        category,
        branch,
        description,
        stock,
      },
      { new: true }
    );

    return product;
  } catch (error) {
    console.log(error);
  }
};

const removeProductById = async (id) => {
  const product = await Product.findByIdAndDelete(id);
};

const findTopRatedProducts = async () => {
  try {
    const products = await Product.find({ rating: 5 });

    return products;
  } catch (error) {
    console.log(error);
  }
};

export {
  findProductById,
  findProductByName,
  findProductByIdAndUpdate,
  removeProductById,
  findTopRatedProducts,
};
