const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();

async function start() {
  try {
    await sequelize.sync(); // Conexión y sincronización a MySQL
    app.listen(process.env.PORT, () =>
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
    );
  } catch (error) {
    console.error("Error al iniciar servidor:", error);
  }
}

start();
