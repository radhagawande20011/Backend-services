import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

const taskService = new TaskService();

export class TaskController {

  async getTasks(req: Request, res: Response) {
    const tasks = await taskService.getAll();
    res.json(tasks);
  }

  async addTask(req: Request, res: Response) {
    const task = await taskService.create(req.body);
    res.json(task);
  }

  async updateTask(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const task = await taskService.update(id, req.body);
    res.json(task);
  }

  async deleteTask(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await taskService.delete(id);
    res.json({ success: true });
  }
}
