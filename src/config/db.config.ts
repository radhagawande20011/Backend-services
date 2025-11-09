import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// SQLite DB File
export async function getDb() {
  const db = await open({
    filename: './tasks.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assignedTo TEXT NOT NULL,
      status TEXT NOT NULL,
      dueDate TEXT,
      priority TEXT,
      comments TEXT
    )
  `);

  return db;
}
