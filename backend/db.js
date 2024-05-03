const pg = require("pg");
const env = require("dotenv");
env.config();
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect()
  .then(() => {
    console.log("Database connected sucessfully");
  })
  .catch((err) => {
    console.log("Error in fetching the database:", err);
  });

module.exports = db;
