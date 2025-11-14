const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Gestion = sequelize.define("Gestion", {
  clienteDocumento: { type: DataTypes.STRING, allowNull: false },
  clienteNombre: { type: DataTypes.STRING, allowNull: false },
  asesorId: { type: DataTypes.STRING, allowNull: false },
  tipificacion: {
    type: DataTypes.ENUM(
      "Contacto Efectivo",
      "No Contacto",
      "Promesa de Pago",
      "Pago Realizado",
      "Refinanciación",
      "Información",
      "Escalamiento",
      "Otros"
    ),
    allowNull: false
  },
  subtipificacion: DataTypes.STRING,
  canalOficial: { type: DataTypes.BOOLEAN, defaultValue: true },
  valorCompromiso: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  fechaCompromiso: DataTypes.DATE,
  observaciones: { type: DataTypes.TEXT, validate: { len: [0, 1000] }},
  recordingUrl: DataTypes.STRING,
  estado: { type: DataTypes.ENUM("abierta", "cerrada"), defaultValue: "abierta" }
});

module.exports = Gestion;

