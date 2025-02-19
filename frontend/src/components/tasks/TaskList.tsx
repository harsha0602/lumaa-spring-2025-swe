import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    return (
        <ul>
            {tasks.map((task: any) => (
                <li key={task.id}>{task.title} - {task.is_complete ? 'Completed' : 'Pending'}</li>
            ))}
        </ul>
    );
};

export default TaskList;