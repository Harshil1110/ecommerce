const pg = require("pg");
const env = require("dotenv");
env.config();

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL + "?sslmode=require",
});

db.connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error in fetching the database:", err);
  });

module.exports = db;
