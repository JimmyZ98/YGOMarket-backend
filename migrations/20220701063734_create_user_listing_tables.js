/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("username").notNullable();
      table.string("passwordHashed").notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("listing", (table) => {
      table.increments("id").primary();
      table.string("cardName").notNullable();
      table.string("cardCode").notNullable();
      table.string("rarity").notNullable();
      table.string("description").notNullable();
      table.string("image").notNullable();
      table.decimal("marketPrice", 6, 2).notNullable().defaultTo(0.0);
      table.decimal("price", 6, 2).notNullable().defaultTo(0.0);
      table
        .integer("sellerId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
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
  return knex.schema.dropTable("listing").dropTable("users");
};
