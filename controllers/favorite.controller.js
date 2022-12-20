import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

const addFavProduct = async (req, res) => {
  const { id } = req.params;

  const userId = req.user;

  try {
    const product = await Product.findById(id);
    const user = await User.findById(userId);

    if (!user) {
      res.status(401).json({
        msg: "No se encontro un usuario",
      });
    }

    user.favorites = user.favorites.concat(product._id);

    const savedUser = await user.save();

    res.json({
      msg: "Agregado a favoritos",
      savedUser,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const removeFavProduct = async (req, res) => {
  const { id } = req.params;

  const userId = req.user._id;

  try {
    const updatedProduct = await User.findOneAndUpdate(
      { _id: userId },
      {
        $pullAll: {
          favorites: [{ _id: id }],
        },
      },
      { new: true }
    );

    const savedUser = await updatedProduct.save();

    return res.status(200).json({
      msg: "Producto removido de favoritos exitosamente",
      savedUser,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export { addFavProduct, removeFavProduct };
