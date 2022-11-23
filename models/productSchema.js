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

const productSchema = new Schema(
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
    subCategory: {
      type: Schema.Types.Mixed,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
