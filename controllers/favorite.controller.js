import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

const addFavProduct = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  try {
    const product = await Product.findById(id);
    const favProduct = await User.findOneAndUpdate(
      { name },
      {
        $addToSet: {
          favorites: product,
        },
      }
    );

    if (!favProduct) {
      res.status(401).json({
        msg: "No se encontro un usuario",
      });
    }

    await favProduct.save();

    res.json({
      msg: "Agregado a favoritos",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const removeFavProduct = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;
  try {
    const updatedProduct = await User.findOneAndUpdate(
      { name },
      {
        $pull: {
          favorites: { _id: id },
        },
      }
    );
    await updatedProduct.save();

    return res.status(200).json({
      msg: "Producto removido de favoritos exitosamente",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export { addFavProduct, removeFavProduct };
