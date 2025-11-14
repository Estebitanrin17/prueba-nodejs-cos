const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");

beforeAll(async () => {
  // Reinicia la base de datos para los tests
  await sequelize.sync({ force: true });
});

describe("API Gestiones - Tests E2E", () => {

  // TEST 1: Crear una gestión
  test("Debe crear una gestión correctamente", async () => {
    const res = await request(app)
      .post("/api/v1/gestiones")
      .send({
        clienteDocumento: "12345",
        clienteNombre: "Juan Pérez",
        asesorId: "A100",
        tipificacion: "Información"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  // TEST 2: Listar gestiones
  test("Debe listar gestiones", async () => {
    const res = await request(app).get("/api/v1/gestiones");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  // TEST 3: Filtrar por nombre/documento
  test("Debe filtrar usando q", async () => {
    const res = await request(app).get("/api/v1/gestiones?q=Juan");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  // TEST 4: Ver detalle por ID
  test("Debe obtener una gestión por ID", async () => {
    const res = await request(app).get("/api/v1/gestiones/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  // TEST 5: Borrado lógico
  test("Debe cerrar la gestión (borrado lógico)", async () => {
    const res = await request(app).delete("/api/v1/gestiones/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Gestión cerrada");
  });

});
