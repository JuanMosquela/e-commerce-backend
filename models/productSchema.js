import mongoose, { model, Schema } from "mongoose";

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
    subCategory: {
      type: Schema.Types.Mixed,
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
