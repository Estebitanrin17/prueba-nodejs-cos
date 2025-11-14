const { body } = require("express-validator");

const createGestionSchema = [
  body("clienteDocumento")
    .notEmpty().withMessage("clienteDocumento es requerido")
    .isString().withMessage("clienteDocumento debe ser un string"),

  body("clienteNombre")
    .notEmpty().withMessage("clienteNombre es requerido")
    .isString().withMessage("clienteNombre debe ser un string"),

  body("asesorId")
    .notEmpty().withMessage("asesorId es requerido"),

  body("tipificacion")
    .notEmpty().withMessage("tipificacion es requerida")
    .isIn([
      "Contacto Efectivo",
      "No Contacto",
      "Promesa de Pago",
      "Pago Realizado",
      "Refinanciación",
      "Información",
      "Escalamiento",
      "Otros"
    ]).withMessage("tipificacion no válida"),

  body("valorCompromiso")
    .optional()
    .isFloat({ min: 0 }).withMessage("valorCompromiso debe ser mayor o igual a 0"),

  body("fechaCompromiso")
    .optional()
    .isISO8601().withMessage("fechaCompromiso debe ser una fecha válida"),

  body("observaciones")
    .optional()
    .isLength({ max: 1000 }).withMessage("observaciones debe tener máximo 1000 caracteres")
];

module.exports = {
  createGestionSchema
};
