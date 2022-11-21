import Product from "../models/productSchema.js";

const getAllProducts = async (req, res) => {
  try {
    const [total, products] = await Promise.all([
      await Product.countDocuments({ state: true }),
      await Product.find({ state: true }),
    ]);

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    // .populate("user", "name")
    // .populate("category", "name");

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const addProduct = async (req, res) => {
  const { user, state, ...rest } = req.body;

  try {
    const productInDB = await Product.findOne({ title: rest.title });

    if (productInDB) {
      return res.status(400).json({
        msg: `Product ${rest.title} already exist`,
      });
    }

    const data = {
      ...rest,
      title: rest.title.toLowerCase(),
      user: req.user._id,
    };

    const product = new Product(data);
    await product.save();

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

export { getAllProducts, getProduct, addProduct, updateProduct, removeProduct };
