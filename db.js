const mongoose = require("mongoose");
require("dotenv").config();
// const DB_URL_LOCAL = process.env.DB_URL_LOCAL;
const DB_URL = process.env.DB_URL;

// connection
mongoose.connect(DB_URL);
const db = mongoose.connection;

// events
db.on("connected", () => {
  console.log("✅ MongoDB Server connected...");
});
db.on("disconnected", () => {
  console.log("❌ MongoDB Server disconnected!");
});
db.on("error", (err) => {
  console.log("❓️ MongoDB connection error:", err);
});

module.exports = db;
