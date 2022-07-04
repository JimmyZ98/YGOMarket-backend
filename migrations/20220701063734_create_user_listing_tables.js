/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("name").notNullable().defaultTo("Store Manager");
      table.string("password").notNullable();
      table.string("email").notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("listing", (table) => {
      table.increments("id").primary();
      table.string("cardName").notNullable();
      table.string("cardCode").notNullable();
      table.string("rarity").notNullable();
      table.string("description").notNullable();
      table.string("image").notNullable();
      table.integer("marketPrice").notNullable().defaultTo(0);
      table.integer("price").notNullable().defaultTo(0);
      table
        .integer("sellerId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("listing").dropTable("user");
};
