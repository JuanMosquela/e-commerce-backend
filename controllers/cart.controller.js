import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

const getCart = async (req, res) => {
  const id = req.user._id;

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

    const cart = await Cart.findOne({ owner: id });

    if (!user.cart) {
      return res.status(400).json({
        msg: "Este usuario no tiene un carrito",
      });
    }

    res.status(200).json({
      result: user.cart,
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

    let items = [];

    let object = {};

    if (cart) {
      const duplicatedProduct = cart.items.find((item) => {
        return foundProduct.id === item.item.id;
      });

      if (duplicatedProduct) {
        duplicatedProduct.quantity = duplicatedProduct.quantity + quantity;
        duplicatedProduct.total =
          duplicatedProduct.total + duplicatedProduct.item.price * quantity;

        cart.totalQty = cart.totalQty + quantity;

        let cartTotal = 0;

        cart.items.forEach((item) => {
          cartTotal = cartTotal + item.total;
        });

        cart.subTotal = cartTotal;

        const savedCart = await cart.save();

        return res.status(400).json({ savedCart });
      }

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

const updateProductQuantity = async (req, res) => {
  const owner = req.user._id;
  const { id } = req.params;
  const { value } = req.body;

  try {
    const product = await Product.findById(id);

    const cart = await Cart.findOne({ owner }).populate({
      path: "items",
      populate: {
        path: "item",
      },
    });

    if (!product) {
      return res
        .status(400)
        .json({ msg: "No se encontro el producto con este id" });
    }

    if (!cart) {
      return res.status(400).json({ msg: "No hay carrito con este id" });
    }

    const findProduct = cart.items.find((item) => {
      return product.id === item.item.id;
    });

    if (value == "asc") {
      findProduct.quantity += 1;
      findProduct.total += findProduct.item.price;

      let cartTotal = 0;

      cart.items.forEach((item) => {
        cartTotal += item.total;
      });

      cart.subTotal = cartTotal;
      cart.totalQty += 1;
    } else {
      findProduct.quantity -= 1;
      findProduct.total -= findProduct.item.price;

      cart.subTotal -= findProduct.item.price;
      cart.totalQty -= 1;

      if (findProduct.quantity === 0) {
        console.log("el producto llego a 0");

        const newArray = cart.items.filter((item) => {
          console.log(item.item.id);
          return findProduct.item.id !== item.item.id;
        });

        cart.items = newArray;
      }
    }

    await cart.save();

    res.status(200).json({
      cart,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const removeProduct = async (req, res) => {
  const owner = req.user._id;
  const { id } = req.params;

  try {
    const cart = await Cart.findOne({ owner }).populate({
      path: "items",
      populate: {
        path: "item",
      },
    });

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(400)
        .json({ msg: "No se encontro el producto con este id" });
    }

    if (!cart) {
      return res.status(400).json({ msg: "No hay carrito con este id" });
    }

    const itemIndex = cart.items.findIndex((item) => {
      return item.item.id === product.id;
    });

    const newArray = cart.items.filter((item) => {
      return product.id !== item.item.id;
    });

    cart.totalQty = cart.totalQty - cart.items[itemIndex].quantity;
    cart.subTotal = cart.subTotal - cart.items[itemIndex].total;
    cart.items = newArray;

    const newCart = await cart.save();

    res.status(200).json({
      result: newCart,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const emptyCart = async (req, res) => {
  const owner = req.user._id;

  try {
    const cart = await Cart.findOne({ owner });

    cart.items = [];
    cart.subTotal = 0;
    cart.totalQty = 0;

    const savedCart = await cart.save();

    res.status(200).json({
      savedCart,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export {
  getCart,
  addProductToCart,
  updateProductQuantity,
  emptyCart,
  removeProduct,
};
