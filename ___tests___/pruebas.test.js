import request from 'supertest';
import app from '../index.js'; 
import pool from '../index.js';


describe("Pruebas de integración básica con CRUD", () => {
  let taskId; 

  // 1️⃣ Crear una tarea 
  test("POST /tareas crea una tarea", async () => {
    const res = await request(app)
      .post("/tareas")
      .send({ titulo: "Hacer la tarea", estado: "pendiente" });

    expect(res.statusCode).toBe(201);

    tareaId = res.body.id; // se guarda el id para que se use después
  });

  // 2️⃣ Obtener todas las tareas 


  // 3️⃣ Obtener una tarea por id 


  // 4️⃣ Actualizar una tarea 
 

  // 5️⃣ Eliminar una tarea
}); 
