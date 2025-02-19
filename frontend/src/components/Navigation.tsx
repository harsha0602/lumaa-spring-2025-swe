import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <nav className="navigation">
            <Link to="/" className="nav-btn">Home </Link>
            {isAuthenticated ? (
                <>
                    <Link to="/tasks" className="nav-btn">Tasks</Link>
                    <button onClick={handleLogout}>Logout</button>

                </>
            ) : (
                <>  
                    <Link to="/login" className="nav-btn">Login</Link>
                    <Link to="/register" className="nav-btn">Register</Link>
                    

                </>
            )}
        </nav>
    );
};

export default Navigation;