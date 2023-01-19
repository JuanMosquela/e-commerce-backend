import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: Schema.Types.Mixed,
    transactionAmount: Schema.Types.Mixed,
    orderId: {
      type: Number,
    },

    products: [
      {
        product: {
          id: String,
          title: String,
          pictureURL: String,
          price: Number,
          quantity: Number,
        },
        quantity: Number,
        total: Number,
      },
    ],

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
        "closed",
        "paid",
        "approved",
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
