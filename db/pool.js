const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
/*module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "jsdev4web",
  database: "auth_project",
  password: "password",
  port: 5432 // The default port
});*/


module.exports = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_CA,
  },
});
