import express from 'express';
import bodyParser from 'body-parser'
import dotenv from "dotenv";
import entidadRoutes from "./routes/entidad.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Rutas
app.use("/tareas", tareasRoutes);

// Ruta 404 para endpoints no encontrados
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "¡Error! X.X", detalle: err.message });
});

//Levantar puerto en el servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});