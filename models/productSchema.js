import mongoose, { model, Schema } from "mongoose";

const reviewSchema = Schema(
  {
    ratings: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

export const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: true,
    },
    pictureURL: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    branch: {
      type: String,
      required: true,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    boughtBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
