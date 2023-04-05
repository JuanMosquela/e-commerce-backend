import mongoose, { Schema, model } from "mongoose";

import { productSchema } from "./productSchema.js";

const cartSchema = new Schema(
  {
    products: {
      type: [productSchema],
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The user name is required"],
    },

    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password is requied"],
    },
    picture: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,

      default: false,
    },
    state: {
      type: Boolean,
      default: true,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
