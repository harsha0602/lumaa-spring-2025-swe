import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/tasks">Tasks</Link>
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navigation;