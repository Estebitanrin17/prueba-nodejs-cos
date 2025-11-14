const express = require("express");
const gestionRoutes = require("./gestion.routes");

const router = express.Router();

router.use("/gestiones", gestionRoutes);

module.exports = router;
