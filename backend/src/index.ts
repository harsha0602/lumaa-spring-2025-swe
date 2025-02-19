import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { register, login } from './controllers/auth.controller';
import { getTasks, createTask, updateTask, deleteTask } from './controllers/task.controller';
import { authenticateToken } from './middleware/auth.middleware';
import { exec } from 'child_process';
import path from 'path';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
const createTablesScript = path.join(__dirname, '../migrations/create_tables.sql');
exec(`psql -U postgres -d postgres -f ${createTablesScript}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing create_tables.sql: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
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