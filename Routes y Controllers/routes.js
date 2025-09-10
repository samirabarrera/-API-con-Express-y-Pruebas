import express from "express";
import {
  getTask,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea
} from "../Routes y Controllers/controller.js";
const router = express.Router();

//CRUD
router.get("/", getTask);           
router.get("/:id", getTareaById);
router.post("/", createTarea); 
router.put("/:id", updateTarea);
router.delete("/:id", deleteTarea);

export default router;
