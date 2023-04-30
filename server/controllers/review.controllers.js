// Import the User model
const Review = require("../models/review.models");

const review_post = async (req, res) => {
  const { revName, title, message } = req.body;

  try {
    // Create a new user
    const review = await Review.create({ revName, title, message });
    
    // final response to front end
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};

const review_get = async (req, res) => {
  try {
    const reviews = await Review.find();
    
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  review_post,
  review_get
};