const express = require("express");
const fs = require("fs");
const router = express.Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);

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
