import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav style={{ background: '#333', color: '#fff', padding: '10px' }}>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
                <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
                <li><Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link></li>
                <li><Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
