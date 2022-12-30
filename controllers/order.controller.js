import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";

const createOrder = async (req, res) => {
  const { id } = req.user;

  console.log(id);

  try {
    const user = await User.findById(id);

    const cart = await Cart.findOne({ owner: user.id });

    if (!user) {
      return res.status(400).json({
        msg: "No existe este usuario",
      });
    }

    if (!cart) {
      return res.status(400).json({
        msg: "No existe este carrito",
      });
    }

    const newOrder = await new Order({
      products: cart.items,
      orderBy: user._id,
      orderStatus: "On Delivery",
    }).save();

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { createOrder };
