import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

const getCart = async (req, res) => {
  const id = req.user._id;

  console.log(id);

  try {
    const user = await User.findById(id).populate({
      path: "cart",
      populate: {
        path: "items",
        populate: {
          path: "item",
        },
      },
    });

    if (!user.cart) {
      return res.status(400).json({
        msg: "No hay usuario",
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
    const cart = await Cart.findOne({ owner }).populate({
      path: "items",
      populate: {
        path: "item",
      },
    });

    const user = await User.findById(owner);

    const foundProduct = await Product.findById(product);

    // const newProduct = {
    //   item: foundProduct._id,
    //   quantity: quantity,
    //   subTotal: foundProduct.price * quantity,
    // };

    // if (!foundProduct) {
    //   return res
    //     .status(400)
    //     .json({ msg: `No se encontro el producto con id ${product._id}` });
    // }

    if (cart) {
      console.log(cart);
      const duplicatedProduct = cart.items.find((item) => {
        return foundProduct.id === item.item.id;
      });

      console.log(duplicatedProduct);

      if (duplicatedProduct) {
        return res.status(400).json({ msg: "el producto esta repetido" });
      }

      let object = {};

      (object.item = foundProduct._id),
        (object.quantity = quantity),
        (object.total = foundProduct.price * quantity);

      cart.items.push(object);
      cart.totalQty = cart.totalQty + quantity;
      cart.subTotal = cart.subTotal + foundProduct.price * quantity;

      const savedCart = await cart.save();

      return res.status(200).json({
        msg: "hay carrito",
        savedCart,
      });
    } else {
      console.log("no hay carrito");

      let items = [];

      let object = {};

      (object.item = foundProduct._id),
        (object.quantity = quantity),
        (object.total = foundProduct.price * quantity);
      items.push(object);

      let subTotal = 0;

      items.forEach((item) => {
        subTotal = subTotal + item.total;
      });

      let totalQty = 0;

      items.forEach((item) => {
        totalQty = totalQty + item.quantity;
      });

      const newCart = await new Cart({
        owner,
        items,
        subTotal,
        totalQty,
      });

      const savedCart = await newCart.save();

      user.cart = savedCart._id;

      await user.save();

      return res.status(200).json({
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
