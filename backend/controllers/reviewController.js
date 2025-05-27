const Review = require('../models/reviewModel');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { vehicle, driver, rating, comment, booking } = req.body;

    const review = await Review.create({
      user: req.user._id,
      vehicle,
      driver,
      rating,
      comment,
      booking,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all reviews for a vehicle
// @route   GET /api/reviews/vehicle/:id
// @access  Public
const getVehicleReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ vehicle: req.params.id })
      .populate('user', 'name')
      .populate('driver', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews for a driver
// @route   GET /api/reviews/driver/:id
// @access  Public
const getDriverReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ driver: req.params.id })
      .populate('user', 'name')
      .populate('vehicle', 'registrationNumber');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  
  }
};

module.exports = {
  createReview,
  getVehicleReviews,
  getDriverReviews,
};