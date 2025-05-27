const express = require('express');
const {
  processPayment,
  updatePaymentStatus,
  getUserPayments,
} = require('../controllers/stripePayment');
const { protect } = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, processPayment)
  .get(protect, getUserPayments);

router.route('/:id/status')
  .put(protect, updatePaymentStatus);

module.exports = router;