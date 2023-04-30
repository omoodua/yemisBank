// Import Mongoose
const { Schema, model } = require("mongoose");

const strReq = {
  type: String,
  required: true
};

const reviewSchema = new Schema({
  revName: strReq,
  title: strReq,
  message: strReq,
}, { timestamps: true });

const Review = model("review", reviewSchema);

module.exports = Review;