import express from "express";
import bodyParser from "body-parser";
import { pool } from "./db.js";
import cors from "cors";
import tareasRoutes from "./routesAndControllers/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pruebaConexion = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Hora actual en la base de datos:", res.rows[0]);
  } catch (err) {
    console.error("Fallo en prueba de conexión:", err);
  }
};

// Rutas
app.use("/tareas", tareasRoutes);

// Ruta 404 para endpoints no encontrados
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware
app.use((err, req, res, next) => {
  console.error("Error interno:", err.stack);
  res.status(500).json({ error: "Error interno del servidor", detalle: err.message });
});

//Levantar puerto en el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo exitosamente en http://localhost:3000");
});
export default app;
