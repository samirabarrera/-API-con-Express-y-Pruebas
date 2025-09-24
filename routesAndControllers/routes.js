import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../routesAndControllers/controller.js";

const router = express.Router();

//CRUD
router.get("/", getTasks);           
router.get("/:id", getTaskById);
router.post("/", createTask); 
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
