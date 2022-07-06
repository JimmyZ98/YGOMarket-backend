const connections = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "rootroot",
      database: "ygomarket_db",
    },
  },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_URL,
  },
};

module.exports =
  process.env.NODE_ENV === "production"
    ? connections.production
    : connections.development;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
