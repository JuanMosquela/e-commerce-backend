import cloudinary from "../config/cloudinary-config.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

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
    const product = await Product.findById(id).populate("owner");

    if (!product) {
      res.status(401).json({ msg: "No se encontro un producto con este id" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const addProduct = async (req, res) => {
  const { title, category, branch, stock, description, price } = req.body;
  const user = req.user;
  const { picture } = req.files;

  try {
    const userInDB = await User.findById(user._id);
    const productInDB = await Product.findOne({ title });

    let numberPrice = Number(price);
    let numberStock = Number(stock);

    if (productInDB) {
      return res.status(400).json({
        msg: `Product ${title} already exist`,
      });
    }

    if (picture) {
      // const uploadRes = await cloudinary.uploader.upload(picture, {
      //   upload_preset: "online-shop",
      // });

      const { tempFilePath } = req.files.picture;

      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

      // const fileName = await uploadFileHelper(req.files, collection);

      // model.picture = secure_url;

      if (secure_url) {
        const product = new Product({
          title,
          branch,
          price: numberPrice,
          stock: numberStock,
          category,
          description,
          pictureURL: secure_url,
          owner: user._id,
        });

        const savedProduct = await product.save();

        userInDB.products = userInDB.products.concat(savedProduct._id);

        await userInDB.save();

        res.status(200).json(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, category, branch, stock, description, price } = req.body;
  const { picture } = req.files;

  try {
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

    if (product.pictureURL) {
      const fileArray = product.pictureURL[0].split("/");
      const fileName = fileArray[fileArray.length - 1];
      const [public_id] = fileName.split(".");
      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = picture;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    product.pictureURL = secure_url;

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

const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({
      msg: "Product removed from database",
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
