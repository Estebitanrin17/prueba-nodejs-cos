const express = require("express");
const controller = require("../controllers/gestion.controller");

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;

