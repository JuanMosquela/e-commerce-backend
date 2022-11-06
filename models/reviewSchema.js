import mongoose, { Schema } from "mongoose";

const reviewSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },
});

export default reviewSchema;
