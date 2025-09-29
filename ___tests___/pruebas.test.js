import request from "supertest";
import app from "../index.js";
import { pool } from "../db.js";

describe("Pruebas integradas de Tareas", () => {
  //Quinta tarea
  test("POST /tareas crea la tarea", async () => {
    const res = await request(app).post("/tareas").send({
      titulo: "Tarea 5",
      descripcion: "Primera prueba integrada",
      estado: "pendiente",
    });
    expect(res.status).toBe(201);
  });

  //Sexta tarea
  test("POST /tareas crea la tarea", async () => {
    const res = await request(app).post("/tareas").send({
      titulo: "Tarea 6",
      descripcion: "Segunda prueba integrada",
      estado: "completada",
    });

    expect(res.status).toBe(201);
  });

  //Séptima tarea
  test("POST /tareas crea la tarea", async () => {
    const res = await request(app).post("/tareas").send({
      titulo: "Tarea 7",
      descripcion: "Tercer prueba integrada",
      estado: "pendiente",
    });

    expect(res.status).toBe(201);
  });

  //Obtener todas las tareas juntas
  test("GET /tareas devuelve todas las tareas", async () => {
    const res = await request(app).get("/tareas");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const tareasExistentes = res.body.map((t) => t.id);
    taskIds.forEach((id) => {
      expect(tareasExistentes).toContain(id);
    });
  });

  //Obtener tarea por ID
  test("GET /tareas/:id devuelve la tarea por su id", async () => {
    for (let id of taskIds) {
      const res = await request(app).get(`/tareas/${id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", id);
    }
  });

  // cerrar conexión con la BD
  afterAll(async () => {
    await pool.end();
  });
});
