const express = require("express");
const fs = require("fs");
const router = express.Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);
const SERVER_URL = process.env.REACT_APP_MAIN_URL;

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "cad",
          product_data: {
            name: "Dark Magician",
          },
          unit_amount: 10000,
        },
        quantity: 1,
      },
    ],
    success_url: `${SERVER_URL}/success`,
    cancel_url: `${SERVER_URL}/cancel`,
  });
  res.json({ url: session.url });
});

router.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "cad",
  });

  console.log("Payment request received", total);

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
