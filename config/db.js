/*
 * Database connection file.
 */
const mongoose = require("mongoose");

const dbConnection = process.env.DB_URL ?? "mongodb://127.0.0.1:27017/vivek-db"
mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug",false);
let db = mongoose.connection;

db.once("open", () => {
  logger.info("Connection Succeed");
});

db.on("error", () => {
  logger.info("Error in Connect Mongo");
});

module.exports = mongoose;
