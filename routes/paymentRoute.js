const express = require("express");
const fs = require("fs");
const { restart } = require("nodemon");
// const { default: knex } = require("knex");
const router = express.Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);
const SERVER_URL = process.env.REACT_APP_MAIN_URL;
const knex = require("knex")(require("../knexfile"));

// router.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     line_items: [
//       {
//         price_data: {
//           currency: "cad",
//           product_data: {
//             name: "Dark Magician",
//           },
//           unit_amount: 10000,
//         },
//         quantity: 1,
//       },
//     ],
//     success_url: `${SERVER_URL}/success`,
//     cancel_url: `${SERVER_URL}/cancel`,
//   });
//   res.json({ url: session.url });
// });

router.route("/create-checkout-session").post((req, res) => {
  knex("listing")
    .whereIn("listing.id", req.body)
    .then(async (data) => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: data.map((item) => {
          return {
            price_data: {
              currency: "cad",
              product_data: {
                name: item.cardName,
              },
              unit_amount: item.price * 100,
            },
            quantity: 1,
          };
        }),
        success_url: `${SERVER_URL}/success`,
        cancel_url: `${SERVER_URL}/cancel`,
      });
      res.json({ url: session.url });
    })
    .catch((err) => {
      res.status(400).send(`Error checking out: ${err}`);
    });
});

router.route("/test2").post((req, res) => {
  knex("listing")
    .whereIn("listing.id", req.body)
    .then((data) => {
      res.json(data);
    });
});

module.exports = router;
