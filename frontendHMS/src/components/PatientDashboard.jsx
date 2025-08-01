import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PatientDashboard() {
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8080/patient/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatient(response.data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchPatientData();
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white h-screen p-4">
                <h2 className="text-2xl font-bold text-center mb-8">Dashboard</h2>
                <ul>
                    <li><Link to="/dashboard" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">Home</Link></li>
                    <li><Link to="/profile" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">Profile</Link></li>
                    <li><Link to="/appointments" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">Appointments</Link></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6">Welcome, {patient ? patient.name : 'Loading...'}</h1>

                {/* Patient Profile */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Patient Profile</h3>
                    <p>Name: {patient ? patient.name : 'Loading...'}</p>
                    <p>Email: {patient ? patient.email : 'Loading...'}</p>
                    <p>Phone: {patient ? patient.phone : 'Loading...'}</p>
                </section>
            </div>
        </div>
    );
}

export default PatientDashboard;
