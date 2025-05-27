const express = require('express');
const {
  createReview,
  getVehicleReviews,
  getDriverReviews,
} = require('../controllers/reviewController');
const { protect } = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createReview);

router.route('/vehicle/:id')
  .get(getVehicleReviews);

router.route('/driver/:id')
  .get(getDriverReviews);

module.exports = router;