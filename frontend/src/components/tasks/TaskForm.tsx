import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {
                title,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Task added successfully');
            // Optionally clear form or update UI
        } catch (error) {
            console.error('Failed to add task', error);
            alert('Failed to add task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;