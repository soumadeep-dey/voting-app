const express = require("express");
const app = express();
require("dotenv").config();
// DB connect
const db = require("./db");
//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🛜  Server running on port: ${PORT}...`);
});
