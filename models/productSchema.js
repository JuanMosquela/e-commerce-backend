import mongoose, { model, Schema } from "mongoose";
import reviewSchema from "./reviewSchema.js";

const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    pictureURL: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      unique: false,
      required: true,
    },
    description: {
      type: String,
      unique: false,
      required: true,
    },
    stock: {
      type: Number,
      unique: false,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: {
      type: [reviewSchema],
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
