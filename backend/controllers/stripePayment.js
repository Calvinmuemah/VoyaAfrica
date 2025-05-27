const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/paymentModel');
const Booking = require('../models/booking');

// @desc    Process payment
// @route   POST /api/payments
// @access  Private
const processPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod, amount } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    let paymentIntent;
    if (paymentMethod === 'card') {
      paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        payment_method_types: ['card'],
      });
    }

    console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

    const payment = await Payment.create({
      booking: bookingId,
      user: req.user._id,
      amount,
      paymentMethod,
      transactionId: paymentIntent ? paymentIntent.id : `MPESA-${Date.now()}`,
      status: 'pending',
    });

    res.status(201).json({
      payment,
      clientSecret: paymentIntent ? paymentIntent.client_secret : null,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id/status
// @access  Private
const updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (payment) {
      payment.status = req.body.status;
      const updatedPayment = await payment.save();

      // Update booking payment status
      if (payment.status === 'completed') {
        await Booking.findByIdAndUpdate(payment.booking, {
          paymentStatus: 'completed',
        });
      }

      res.json(updatedPayment);
    } else {
      res.status(404);
      throw new Error('Payment not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Get user payments
// @route   GET /api/payments
// @access  Private
const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('booking', 'scheduledTime status');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  processPayment,
  updatePaymentStatus,
  getUserPayments,
};