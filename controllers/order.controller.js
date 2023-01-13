import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import createMPOrder from "../helpers/create-order.js";

import mercadopago from "../config/mercadopago-config.js";
import createOrder from "../helpers/create-order.js";
import Product from "../models/productSchema.js";
import sendEmail from "../helpers/send-email.js";

// const createOrder = async (req, res) => {
//   const { id } = req.user;
//   const { name, adress, paymentMethod, postalCode, country } = req.body;

//   try {
//     const user = await User.findById(id);

//     const cart = await Cart.findOne({ owner: user.id }).populate({
//       path: "items",
//       populate: {
//         path: "item",
//       },
//     });

//     if (!user) {
//       return res.status(400).json({
//         msg: "No existe este usuario",
//       });
//     }

//     if (!cart) {
//       return res.status(400).json({
//         msg: "No existe este carrito",
//       });
//     }

// let update = cart.items.map((item) => {
//   return {
//     updateOne: {
//       filter: { _id: item.item._id },
//       update: { $inc: { stock: -item.quantity } },
//     },
//   };
// });

// await Product.bulkWrite(update, {});

//     const newOrder = new Order({
//       products: cart.items,
//       orderBy: user._id,
//       orderStatus: "On Delivery",
//       name,
//       adress,
//       paymentMethod,
//       country,
//       postalCode,
//     });

//     const order = await newOrder.save();

//

//     // cart.items = [];
//     // cart.subTotal = 0;
//     // cart.totalQty = 0;

//     // await cart.save();
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

//acesstokenvendedor = TEST-2151239761844359-010513-5f9b4389ea7feba2a52fb8e0e9eae377-1276901883

const createPayment = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    lastName,
    email,
    streetName,
    streetNumber,
    zipCode,
    areaCode,
    phone,
    identification,
    identificationNumber,
  } = req.body;

  try {
    const cart = await Cart.findById(id).populate([
      "owner",
      {
        path: "items",
        populate: {
          path: "item",
        },
      },
    ]);

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
          area_code: String(areaCode),
          number: phone,
        },
        address: {
          zip_code: String(zipCode),
          street_name: streetName,
          street_number: streetNumber,
        },
        email,
        identification: {
          number: String(identificationNumber),
          type: identification,
        },
        name: name,
        surname: lastName,
        date_created: Date.now(),
      },
      auto_return: "approved",
      binary_mode: true,
      notification_url: `https://5db5-2800-810-48a-cc1-49d4-99e4-8654-6334.sa.ngrok.io/api/order/notification/?owner=${cart.owner.id}`,
      // "https://e-commerce-backend-production-e980.up.railway.app/api/notification",
    };

    const { body } = await mercadopago.preferences.create(preference);

    res.status(200).json({
      body,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const notification = async (req, res) => {
  const { query } = req;
  const { owner } = req.query;

  const user = await User.findById(owner).populate({
    path: "cart",
    populate: {
      path: "items",
      populate: {
        path: "item",
      },
    },
  });

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
    if (body?.payments) {
      createOrder(body?.payments[0].id, user);

      sendEmail(user);

      let update = user.cart.items.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.item._id },
            update: {
              $inc: { stock: -item.quantity },
              $addToSet: { boughtBy: owner },
            },
          },
        };
      });
      await Product.bulkWrite(update, {});
    }

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
