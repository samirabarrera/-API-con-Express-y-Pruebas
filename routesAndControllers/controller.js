import { pool } from "../db.js";

//Crear tarea
export const createTask = async (req, res) => {
  const { titulo, descripcion} = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO postgres.public.tareas (titulo, descripcion)
      VALUES ($1, $2)`,
      [titulo, descripcion]
    );

    res.status(201).json({
      mensaje: "Tarea creada exitosamente",
      tarea: result.rows[0],
    });
  } catch (error) {
    console.error("Error al crear la tarea", error);
    res
      .status(500)
      .json({ error: "Error al crear tarea", detalle: error.message });
  }
};

// Ver tareas hechas
export const getTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tareas");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener tareas:", err);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

//GET CON LA RUTA /tareas/:id
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM tareas WHERE id = $1",
      [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error obteniendo id de la tarea", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Actualizar con la ruta "/tareas/:id"
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estado } = req.body;
  try {
    
    const result = await pool.query(
      `UPDATE tareas 
       SET titulo = COALESCE($1, titulo), 
           descripcion = COALESCE($2, descripcion)
           estado = COALESCE($3, estado)
       RETURNING *`,
      [titulo, descripcion, estado]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({ error: "No se actualizó la tarea", detalle: error.message });
  }
};

//Delete con la ruta "/tareas/:id"
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tareas WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res
    .status(404)
    .json({ error: "Tarea no encontrada" });
    res.json({ mensaje: "Tarea eliminada", tarea: result.rows[0] });

  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
};
