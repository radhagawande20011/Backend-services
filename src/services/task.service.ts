import { getDb } from "../config/db.config";
import { Task } from "../models/task.model";

export class TaskService {

  async getAll(): Promise<Task[]> {
    const db = await getDb();
    return db.all("SELECT * FROM tasks ORDER BY id DESC");
  }

  async create(task: Task) {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO tasks (assignedTo, status, dueDate, priority, comments)
       VALUES (?, ?, ?, ?, ?)`,
      [task.assignedTo, task.status, task.dueDate, task.priority, task.comments]
    );
    return { id: result.lastID, ...task };
  }

  async update(id: number, task: Task) {
    const db = await getDb();
    await db.run(
      `UPDATE tasks SET assignedTo=?, status=?, dueDate=?, priority=?, comments=? WHERE id=?`,
      [task.assignedTo, task.status, task.dueDate, task.priority, task.comments, id]
    );
    return { id, ...task };
  }

  async delete(id: number) {
    const db = await getDb();
    return db.run(`DELETE FROM tasks WHERE id=?`, [id]);
  }
}
