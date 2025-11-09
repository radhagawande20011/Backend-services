import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router();
const controller = new TaskController();

router.get("/", controller.getTasks);
router.post("/add", controller.addTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

export default router;
