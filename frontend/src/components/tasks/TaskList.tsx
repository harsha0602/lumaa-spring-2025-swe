import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    interface Task {
        id: number;
        title: string;
        description: string;
        is_complete: boolean;
    }
    
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);
   
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };
    const handleAddTask = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, newTask, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchTasks();
            setNewTask({ title: '', description: '' });
        } catch (error) {
            console.error('Error adding task', error);
        }
    };

    const handleDeleteTask = async (id: number): Promise<void> => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const handleUpdateTask = async (id: number, updatedTask: object) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, updatedTask, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchTasks();
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task', error);
        }
    };
    const handleEditClick = (task: Task) => {
        setEditingTask(task);
    };
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingTask) {
            const { name, value, type, checked } = e.target;
            setEditingTask({
                ...editingTask,
                [name]: type === 'checkbox' ? checked : value
            });
        }
    };
    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingTask) {
            handleUpdateTask(editingTask.id, editingTask);
        }
    };

    return (
        <div>
            <h1>Tasks</h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <label>
                            Complete:
                            <input
                                type="checkbox"
                                checked={task.is_complete}
                                readOnly
                            />
                        </label>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        <button onClick={() => handleEditClick(task)}>Edit</button>
                    </li>
                ))}
            </ul>
            {editingTask && (
                <form onSubmit={handleEditSubmit}>
                    <h2>Edit Task</h2>
                    <input
                        type="text"
                        name="title"
                        value={editingTask.title}
                        onChange={handleEditChange}
                    />
                    <input
                        type="text"
                        name="description"
                        value={editingTask.description}
                        onChange={handleEditChange}
                    />
                    <label>
                        Complete:
                        <input
                            type="checkbox"
                            name="is_complete"
                            checked={editingTask.is_complete}
                            onChange={handleEditChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default TaskList;