const listingData = require("../seed_data/listing");
const userData = require("../seed_data/user");

exports.seed = function (knex) {
  return knex("user")
    .del()
    .then(function () {
      return knex("user").insert(userData);
    })
    .then(() => {
      return knex("listing").del();
    })
    .then(() => {
      return knex("listing").insert(listingData);
    });
};
