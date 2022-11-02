import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    products: [
      {
        productId: String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);

export default Cart;
