require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

// Create Stripe Checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  const { selectedSeats, amount, userEmail, busId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [{
        price_data: {
          currency: 'kes',
          product_data: {
            name: `Bus Ticket - Bus ID: ${busId}`,
          },
          unit_amount: amount * 100, // Stripe uses cents
        },
        quantity: selectedSeats.length,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Payment failed.' });
  }
});