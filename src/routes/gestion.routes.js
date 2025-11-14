const express = require("express");
const controller = require("../controllers/gestion.controller");
const validate = require("../middlewares/validate");
const { createGestionSchema } = require("../validations/gestion.schema");

const router = express.Router();

router.post("/", createGestionSchema, validate, controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.put("/:id", createGestionSchema, validate, controller.update);
router.patch("/:id", createGestionSchema, validate, controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
