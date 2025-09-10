import request from "supertest";
import app from "../index.js"; 

describe("Pruebas de integración básica para CRUD", () => {
  let tareaId; 

  // 1️⃣ Crear una tarea 
  test("POST /tareas crea una tarea", async () => {
    const res = await request(app)
      .post("/tareas")
      .send({ titulo: "Hacer la tarea", estado: "pendiente" });

    expect(res.statusCode).toBe(201);

    tareaId = res.body.id; // se guarda el id para que se use después
  });

  // 2️⃣ Obtener todas las tareas 
  test("GET /tareas devuelve lista de tareas", async () => {
    const res = await request(app).get("/tareas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 3️⃣ Obtener una tarea por id 
  test("GET /tareas/:id devuelve una tarea", async () => {
    const res = await request(app).get(`/tareas/${tareaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", tareaId);
  });

  // 4️⃣ Actualizar una tarea 
  test("PUT /tareas/:id actualiza una tarea", async () => {
    const res = await request(app)
      .put(`/tareas/${tareaId}`)
      .send({ titulo: "Hacer la tarea modificada", estado: "completada" });

    expect(res.statusCode).toBe(200);
  });

  // 5️⃣ Eliminar una tarea 
  test("DELETE /tareas/:id elimina una tarea", async () => {
    const res = await request(app).delete(`/tareas/${tareaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Tarea eliminada");
  });
});
