import axios from "axios";
import Order from "../models/orderSchema.js";

const createOrder = async (orderId, user) => {
  try {
    const config = {
      headers: {
        "Accept-Encoding": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    };

    const { data } = await axios.get(
      `https://api.mercadopago.com/v1/payments/${orderId}`,
      config
    );

    const reworked_items = data.additional_info.items.map((item) => {
      return {
        product: item.id,
        quantity: item.quantity,
        total: item.quantity * item.unit_price,
      };
    });

    const order = await new Order({
      firstName: data.additional_info.payer.first_name,
      lastName: data.additional_info.payer.last_name,
      email: data.payer.email,
      phone: data.additional_info.payer.phone,
      transactionAmount: data.transaction_amount,
      orderStatus: data.status,
      orderBy: user.id,
      orderId: data.id,
      products: reworked_items,
    }).save();

    user.orders.push(order);

    await user.save();
  } catch (error) {
    console.log(error);
  }
};

export default createOrder;
