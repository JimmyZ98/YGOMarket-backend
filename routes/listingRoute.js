const express = require("express");
const fs = require("fs");
const router = express.Router();
const knex = require("knex")(require("../knexfile").development);

router
  .route("/")
  .get((req, res) => {
    knex("listing")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving sales posts: ${err}`)
      );
  })
  .post((req, res) => {
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

module.exports = router;
