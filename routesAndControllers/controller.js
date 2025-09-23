import { pool } from "../db.js";

//POST CON LA RUTA /tareas
export const createTask = async (req, res, next) => {
  const { titulo, descripcion, estado } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO public.tareas (titulo, descripcion, estado) VALUES ($1, $2, $3) RETURNING *",
      [titulo, descripcion, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear tarea:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET
export const getTask = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM tareas ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error obteniendo tareas")
    next(err);
  }
};

//GET CON LA RUTA /tareas/:id
export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM tareas WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error obteniendo id de la tarea", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//PUT CON LA RUTA /tareas/:id
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, estado } = req.body;
    const result = await pool.query(
      "UPDATE tareas SET id = $1, titulo = $2, descripcion = $3 estado = $4"[
        (titulo, descripcion, estado, id)
      ]
    );
  } catch (err) {
    next(err);
  }
};

//DELETE CON LA RUTA /tareas/:id
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM tareas WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Tarea no encontrada" });
    res.json({ mensaje: "Tarea eliminada", tarea: result.rows[0] });
  } catch (err) {
    next(err);
  }
};
