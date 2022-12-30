import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,

          ref: "Products",
        },
        quantity: Number,
        total: Number,
      },
    ],

    paymentMethod: {
      type: String,
      default: "Mercado Pago",
    },

    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "On Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;
