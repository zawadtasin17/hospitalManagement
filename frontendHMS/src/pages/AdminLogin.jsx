// src/pages/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function AdminLogin() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const { login, auth } = useAuth(); // use auth from context

    // If already logged in as admin, redirect to dashboard
    useEffect(() => {
        if (auth && auth.userType === 'admin') {
            navigate('/admindashboard');
        }
    }, [auth, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/auth/login/admin', formData);

            // Store JWT token in localStorage
            localStorage.setItem('jwtToken', res.data.token);

            // Update context: store token, userType, and optionally other info
            login({
                token: res.data.token,
                userType: 'admin',
                username: formData.username,
                id: res.data.id || null, // if API returns admin id
            });

            alert('Logged in successfully!');
            navigate('/admindashboard');
        } catch (err) {
            console.error(err);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md bg-white shadow-lg rounded-lg mt-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
