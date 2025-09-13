import request from "supertest";
import app from "../index.js";
import pool from "../db.js";
import {
  getTask,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../routesAndControllers/controller.js";

afterAll(async () => {
  await pool.end();
});

describe("Pruebas de integración del CRUD", () => {
  let taskId;

  test("POST /tareas crea una tarea", async () => {
    const res = await request(app)
      .post("/tareas")
      .send({ titulo: "Prueba Jest", completado: false });

    taskId = res.body.id;
  });
});
