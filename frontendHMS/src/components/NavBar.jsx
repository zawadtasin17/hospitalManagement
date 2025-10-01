// src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
    const { auth, logout } = useAuth(); // auth = { userType, id?, name? }
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // redirect home after logout
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-white text-2xl font-semibold">Healthcare System</h1>
                </div>
                <div>
                    <ul className="flex space-x-6 text-white">
                        <li>
                            <Link to="/" className="hover:text-green-500">Home</Link>
                        </li>

                        {/* Show Register only if not logged in */}
                        {!auth && (
                            <li>
                                <Link to="/register" className="hover:text-green-500">Register</Link>
                            </li>
                        )}

                        {/* Patient links */}
                        {auth?.userType === 'patient' && (
                            <>
                                <li>
                                    <Link to="/patientdashboard" className="hover:text-green-500">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/appointment" className="hover:text-green-500">Book Appointment</Link>
                                </li>
                                <li>
                                    <Link to="/Patient-appointments" className="hover:text-green-500">My Appointments</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="hover:text-red-500">Logout</button>
                                </li>
                            </>
                        )}

                        {/* Doctor links */}
                        {auth?.userType === 'doctor' && (
                            <>
                                <li>
                                    <Link to="/doctordashboard" className="hover:text-green-500">Dashboard</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="hover:text-red-500">Logout</button>
                                </li>
                            </>
                        )}

                        {/* Admin links */}
                        {auth?.userType === 'admin' && (
                            <>
                                <li>
                                    <Link to="/admindashboard" className="hover:text-green-500">Admin Dashboard</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="hover:text-red-500">Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
