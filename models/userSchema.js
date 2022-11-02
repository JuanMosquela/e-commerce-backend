import mongoose, { Schema, model } from "mongoose";

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
      unique: true,
    },
    pictureURL: {
      type: String,
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
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
