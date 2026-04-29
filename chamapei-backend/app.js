// set up an express server
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chamapei API is running ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// connect transaction route to app
const transactionRoutes = require("./src/routes/transactions");

app.use("/transactions", transactionRoutes);

// connect dashboard route to app
const dashboardRoutes = require("./src/routes/dashboard");

app.use("/dashboard", dashboardRoutes);

// connect grouproute to app
const groupRoutes = require("./src/routes/groups");

app.use("/groups", groupRoutes);

// connect the ai route to app
const aiRoutes = require("./src/routes/ai");

app.use("/ai", aiRoutes);