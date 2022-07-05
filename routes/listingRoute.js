const express = require("express");
const fs = require("fs");
const router = express.Router();
const knex = require("knex")(require("../knexfile").development);

app.route("/", (req, res) => {
  res.send(`<h1>Welcome to my Express App</h1>`);
});

router.route("/").get((req, res) => {
  knex("listing")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving sales posts: ${err}`)
    );
});

router.route("/sell").post((req, res) => {
  const {
    id,
    cardName,
    cardCode,
    rarity,
    description,
    image,
    marketPrice,
    price,
    sellerId,
  } = req.body;
  const newListing = {
    id,
    cardName,
    cardCode,
    rarity,
    description,
    image,
    marketPrice,
    price,
    sellerId,
  };
  knex
    .insert(newListing)
    .into("listing")
    .then(() => {
      knex("listing").then((data) => {
        res.status(200).json(data);
      });
    })
    .catch((err) => {
      res.status(400).send(`Error adding sales post: ${err}`);
    });
});

// router.route("/checkout").post((req, res) => {
//   knex("listing")
//     .whereIn("listing.id", req.body)
//     .del()
//     .then((data) => {
//       res.status(200).json(data);
//     })

//     .catch((err) => {
//       res.status(400).send(`Error checking out: ${err}`);
//     });
// });

router.route("/checkout").post((req, res) => {
  res.send(req.body);
});

// router.route("/checkout").delete((req, res) => {
//   knex("listing")
//     .whereIn("listing.id", [req.body.id])
//     .del()
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       res.status(400).send(`Error checking out: ${err}`);
//     });
// });

module.exports = router;
