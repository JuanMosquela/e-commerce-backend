import cloudinary from "../config/cloudinary-config.js";
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
  const { title, category, brand, stock, description, picture, price } =
    req.body;

  try {
    const productInDB = await Product.findOne({ title });

    if (productInDB) {
      return res.status(400).json({
        msg: `Product ${title} already exist`,
      });
    }

    if (picture) {
      const uploadRes = await cloudinary.uploader.upload(picture, {
        upload_preset: "online-shop",
      });

      if (uploadRes) {
        const product = new Product({
          title,
          brand,
          price,
          stock,
          category,
          description,
          pictureURL: uploadRes,
        });

        const savedProduct = await product.save();

        res.status(200).json({ savedProduct });
      }
    }
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
    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        price,
        pictureURL,
        description,
        stock,
      },
      { new: true }
    );
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

const getProductReviews = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  console.log(product.reviews);

  const productReviews = product.reviews;

  res.json({
    productReviews,
  });
};

const getTopRatedProducts = async (req, res) => {
  try {
    const products = await Product.find({ rating: 5 });

    res.status(200).json({
      results: products,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const addReview = async (req, res) => {
  const { id } = req.params;
  const { user, comment, value } = req.body;

  const review = {
    user,
    ratings: value,
    comment: comment,
  };

  const product = await Product.findById(id);

  const productReviewed = product.reviews.find((review) => {
    return review.user === user;
  });

  if (productReviewed) {
    return res.status(501).json({
      msg: "Product already reviewed",
    });
  } else {
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => review.ratings + acc, 0) /
      product.reviews.length;
  }

  await product.save();

  res.json({
    product,
  });
};

export {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  removeProduct,
  addReview,
  getProductReviews,
  getTopRatedProducts,
};
