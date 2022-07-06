const express = require("express");
const fs = require("fs");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const jsonSecretKey = process.env.JSON_SECRET_KEY;
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  knex("users")
    .select()
    .where("username", username)
    .then((data) => {
      if (!data[0]) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          let passwordHashed = hash;
          let newUser = { firstName, lastName, username, passwordHashed };
          knex
            .insert(newUser)
            .into("users")
            .then(() => {
              knex("users").then((data) => {
                res.status(200).send("Signed up!");
              });
            })
            .catch((err) => {
              res.status(400).send(`Error signing up: ${err}`);
            });
        });
      } else {
        res.send("Username already taken!");
      }
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  knex("users")
    .select()
    .where("username", username)
    .then((data) => {
      if (data) {
        bcrypt.compare(
          password,
          data[0].passwordHashed,
          function (err, result) {
            if (result) {
              let token = jwt.sign({ username: username }, jsonSecretKey);
              res.json({ token: token });
            } else {
              res.status(403).json({
                token: "",
                error: {
                  message:
                    "Error logging in. Invalid username/password combination.",
                },
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(400).send(`Error logging in: ${err}`);
    });
});

router.get("/current", (req, res) => {
  res.json(req.decode);
});

module.exports = router;
