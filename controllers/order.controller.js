import transporter from "../config/nodeMailer.js";
import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import Product from "../models/productSchema.js";

const createOrder = async (req, res) => {
  const { id } = req.user;

  console.log(id);

  try {
    const user = await User.findById(id);

    const cart = await Cart.findOne({ owner: user.id }).populate({
      path: "items",
      populate: {
        path: "item",
      },
    });

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

    let update = cart.items.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.item._id },
          update: { $inc: { stock: -item.quantity } },
        },
      };
    });

    const productUpdated = await Product.bulkWrite(update, {});

    console.log(productUpdated);

    const newOrder = await new Order({
      products: cart.items,
      orderBy: user._id,
      orderStatus: "On Delivery",
    }).save();

    let array = "";

    let n;
    for (n in cart.items) {
      array += `<li>${cart.items[n].item.title} --- <span>${cart.items[
        n
      ].total.toFixed(2)}</span> x <span>${
        cart.items[n].quantity
      }</span> </li>`;
    }

    transporter
      .sendMail({
        from: `"Physical Point" <${process.env.GMAIL_SECRET}> `,
        to: user.email,
        subject: `Order Confirmation - Physical Point`,

        html: `<h1>Thank you for your buy !</h1>
        <h2>Your order confirmation is below</h2>
        <br><br>
       <ul>
       ${array}
       <br>
       <li>$ ${cart.subTotal.toFixed(2)}</li>
       
       
       </ul>`,
      })
      .then(() => console.log("el mensaje se ha enviado correctamente"))
      .catch((err) => console.log(err));

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { createOrder };