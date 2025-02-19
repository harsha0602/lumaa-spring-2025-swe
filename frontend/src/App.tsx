import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import Navigation from './components/Navigation';
import './App.css';

const App = () => {
    return (
        <Router>
            <Navigation />
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/add-task" element={<TaskForm />} />
                    <Route path="/" element={<h1>Welcome Home</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;