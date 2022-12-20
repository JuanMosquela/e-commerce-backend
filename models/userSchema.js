import mongoose, { Schema, model } from "mongoose";
import { productSchema } from "./productSchema.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The user name is required"],
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password is requied"],
      unique: true,
    },
    picture: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    state: {
      type: Boolean,
      default: true,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
