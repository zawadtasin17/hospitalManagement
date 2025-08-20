import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
    const { user } = useAuth();
    const isLoggedIn = !!user;

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-white text-2xl font-semibold">Healthcare System</h1>
                </div>
                <div>
                    <ul className="flex space-x-6 text-white">
                        <li>
                            <Link to="/" className="hover:text-green-500">
                                Home
                            </Link>
                        </li>
                        {!isLoggedIn ? (
                            <li>
                                <Link to="/register" className="hover:text-green-500">
                                    Register
                                </Link>
                            </li>
                        ) : (
                            <li>
                                {/* Adjust dashboard link path if needed */}
                                <Link to={user.userType === 'doctor' ? "/doctordashboard" : "/patientdashboard"} className="hover:text-green-500">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
