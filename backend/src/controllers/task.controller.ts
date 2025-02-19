import { Request, Response } from 'express';
import pool from '../db';

export const getTasks = async (req: Request, res: Response) => {
  // Assume req.user is set by authentication middleware
  const userId = (req as any).user.id;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { title, description } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
        [title, description, userId]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' });
    }
  };

export const updateTask = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { title, description, is_complete } = req.body;
    try {
      const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
        [title, description, is_complete, id, userId]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating task' });
    }
  };
  
export const deleteTask = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;
    try {
      const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
        [id, userId]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting task' });
    }
  };