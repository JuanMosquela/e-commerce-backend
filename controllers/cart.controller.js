import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

const getCart = async (req, res) => {
  const id = req.user._id;

  console.log(id);

  try {
    const user = await User.findById(id).populate("cart");

    console.log(user);

    if (!user.cart) {
      return res.status(400).json({
        msg: "No hay carrito",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const addProductToCart = async (req, res) => {
  const owner = req.user._id;

  const { quantity, product } = req.body;

  try {
    const cart = await Cart.findOne({ owner });

    const user = await User.findById(owner);

    const foundProduct = await Product.findById(product._id);

    const newProduct = {
      item: foundProduct._id,
      quantity: quantity,
      subTotal: foundProduct.price * quantity,
    };

    if (!foundProduct) {
      return res
        .status(400)
        .json({ msg: `No se encontro el producto con id ${product._id}` });
    }

    if (cart) {
      return res.status(401).json({
        msg: "hay carrito",
      });
    } else {
      console.log("no hay carrito");

      const createCart = new Cart();

      createCart.owner = owner;

      console.log(createCart);
      // createCart.items.push(newProduct);
      createCart.subTotal = foundProduct.price * quantity;

      createCart.totalQty = quantity;

      const savedCart = await createCart.save();

      user.cart = savedCart._id;

      await user.save();

      return res.status(201).json({
        savedCart,
      });
    }
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export { getCart, addProductToCart };
