const listingData = require("../seed_data/listing");
const userData = require("../seed_data/users");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert(userData);
    })
    .then(() => {
      return knex("listing").del();
    })
    .then(() => {
      return knex("listing").insert(listingData);
    });
};
