import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { register, login } from './controllers/auth.controller';
import { getTasks, createTask, updateTask, deleteTask } from './controllers/task.controller';
import { authenticateToken } from './middleware/auth.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Public routes for authentication
app.post('/auth/register', register);
app.post('/auth/login', login);

// Protected task routes
app.get('/tasks', authenticateToken, getTasks);
app.post('/tasks', authenticateToken, createTask);
app.put('/tasks/:id', authenticateToken, updateTask);
app.delete('/tasks/:id', authenticateToken, deleteTask);

// A simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Task Management API' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});