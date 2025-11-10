import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { getDb } from "../config/db.config";

const taskService = new TaskService();

export class TaskController {

  async getTasks(req: Request, res: Response) {
    try {
      const { page = 1, pageSize = 20, search = '' } = req.query;
      const offset = (Number(page) - 1) * Number(pageSize);
      const db = await getDb();
  
      const tasks = await db.all(
        `SELECT * FROM tasks 
         WHERE assignedTo LIKE ? OR status LIKE ? OR comments LIKE ?
         ORDER BY id DESC 
         LIMIT ? OFFSET ?`,
        [`%${search}%`, `%${search}%`, `%${search}%`, pageSize, offset]
      );
  
      const count = await db.get(
        `SELECT COUNT(*) as total FROM tasks
         WHERE assignedTo LIKE ? OR status LIKE ? OR comments LIKE ?`,
        [`%${search}%`, `%${search}%`, `%${search}%`]
      );
  
      res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        data: tasks,
        total: count.total
      });

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch tasks",
        error: error.message
      });
    }
  }

  async addTask(req: Request, res: Response) {
    try {
      const task = await taskService.create(req.body);
      res.status(201).json({
        success: true,
        message: "Task added successfully",
        data: task
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to add task",
        error: error.message
      });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const task = await taskService.update(id, req.body);
      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to update task",
        error: error.message
      });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await taskService.delete(id);
      res.status(200).json({
        success: true,
        message: "Task deleted successfully"
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete task",
        error: error.message
      });
    }
  }
}
