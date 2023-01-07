import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import createMPOrder from "../helpers/create-order.js";
import transporter from "../config/nodeMailer.js";
import mercadopago from "../config/mercadopago-config.js";

const createOrder = async (req, res) => {
  const { id } = req.user;
  const { name, adress, paymentMethod, postalCode, country } = req.body;

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

    // let update = cart.items.map((item) => {
    //   return {
    //     updateOne: {
    //       filter: { _id: item.item._id },
    //       update: { $inc: { stock: -item.quantity } },
    //     },
    //   };
    // });

    // await Product.bulkWrite(update, {});

    const newOrder = new Order({
      products: cart.items,
      orderBy: user._id,
      orderStatus: "On Delivery",
      name,
      adress,
      paymentMethod,
      country,
      postalCode,
    });

    const order = await newOrder.save();

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

    // cart.items = [];
    // cart.subTotal = 0;
    // cart.totalQty = 0;

    // await cart.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

//acesstokenvendedor = TEST-2151239761844359-010513-5f9b4389ea7feba2a52fb8e0e9eae377-1276901883

const createPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findById(id).populate({
      path: "items",
      populate: {
        path: "item",
      },
    });

    if (!cart) {
      return res.status(400).json({
        msg: "No existe este carrito",
      });
    }

    const products = cart.items.map((product) => {
      return {
        id: product.item.id,
        title: product.item.title,
        description: product.item.description.slice(0, 200),
        picture_url: product.item.pictureURL[0],
        category_id: product.item.category,
        quantity: product.quantity,
        unit_price: product.item.price,
        currency_id: "ARS",
      };
    });

    let preference = {
      items: products,
      transaction_amount: 123456,
      back_urls: {
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000",
        success: "https://fit-commerce.onrender.com/success",
      },
      payer: {
        phone: {
          area_code: "1875",
          number: 1140895192,
        },
        address: {
          zip_code: "452",
          street_name: "Calle falsa",
          street_number: 123,
        },
        email: "jmosquella11@hotmail.com",
        identification: {
          number: "39549980",
          type: "DNI",
        },
        name: "Juan Manuel",
        surname: "Mosquella",
        date_created: Date.now(),
      },
      auto_return: "approved",
      binary_mode: true,
      notification_url:
        "https://d05b-2800-810-48a-cc1-6cf8-6cc4-1d89-b331.sa.ngrok.io/api/order/notification",
    };

    const { body } = await mercadopago.preferences.create(preference);

    res.status(200).json({
      init_point: body.init_point,
      items: body.items,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const notification = async (req, res) => {
  const { query } = req;

  const topic = query.topic;

  let merchand_order;

  switch (topic) {
    case "payment":
      const payment_id = query.id;
      const payment = await mercadopago.payment.findById(payment_id);
      merchand_order = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );

      break;
    case "merchand_order":
      const order_id = query.id;
      merchand_order = await mercadopago.merchant_orders.findById(order_id);

      break;
  }

  let paidAmount = 0;

  const body = merchand_order?.body;

  body?.payments?.forEach((payment) => {
    if (payment?.status === "approved") {
      paidAmount += payment?.total_paid_amount;
    }
  });

  if (paidAmount >= body?.total_amount) {
    createMPOrder(merchand_order);
    res.status(200).json({
      msg: "orden creada correctamente",
    });
  } else {
    res.status(400).json({
      msg: "orden no pudo ser creada",
    });
  }
};

export { createOrder, createPayment, notification };
