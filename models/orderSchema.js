import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

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
      enum: ["Mercado Pago", "Paypal"],
    },
    shippingAdress: String,

    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    adress: {
      type: String,
      required: true,
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
