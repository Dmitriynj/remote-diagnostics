require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mountRoutes = require("./routes");

// Server port
const HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

mountRoutes(app);
// Insert here other API endpoints

app.use(function errorHandler(error, req, res, next) {
  res.status(error.statusCode || 500);
  res.json({
    message: error.message,
    error: error,
  });
});

module.exports = app;
