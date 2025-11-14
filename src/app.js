const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middlewares/error.handler");

const app = express();
app.use(express.json());

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Rutas principales
app.use("/api/v1", routes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
