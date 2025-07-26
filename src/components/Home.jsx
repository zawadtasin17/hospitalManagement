import React from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Healthcare Management System</h2>
            <p className="text-xl text-gray-600 mb-6">A system to manage patients, doctors, and appointments with ease.</p>
            <div>
                <Link
                    to="/register"
                    className="inline-block px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 transition-all"
                >
                    Register Now
                </Link>
            </div>
        </div>
    );
}

export default Home;
