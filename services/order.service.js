import Order from "../models/orderSchema.js";

const findOrderById = async (id) => {
  try {
    const orders = await Order.find({ orderBy: id });
    return orders;
  } catch (error) {
    console.log(error);
  }
};

export { findOrderById };
