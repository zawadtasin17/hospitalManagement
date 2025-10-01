// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DoctorList from '../components/DoctorList';

function AdminDashboard() {
    const { auth } = useAuth();
    const token = auth?.token || localStorage.getItem('jwtToken');
    const location = useLocation();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDoctors = async (type = 'all') => {
        try {
            setLoading(true);
            let url = 'http://localhost:8080/api/admin/doctors';
            if (type === 'pending') url += '/pending';

            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDoctors(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch doctors');
            setLoading(false);
        }
    };

    // Fetch doctors based on current route
    useEffect(() => {
        if (!token) {
            setError('No authorization token found');
            setLoading(false);
            return;
        }

        if (location.pathname.includes('pending')) {
            fetchDoctors('pending');
        } else {
            fetchDoctors('all');
        }
    }, [location.pathname, token]);

    if (loading) return <p className="text-center py-8">Loading...</p>;
    if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

            <div className="flex justify-center mb-6 space-x-4">
                <Link
                    to="/admindashboard"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    All Doctors
                </Link>
                <Link
                    to="/admindashboard/pending"
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Pending Doctors
                </Link>
                <Link
                    to="/admindashboard/stats"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    System Stats
                </Link>
            </div>

            {/* Show doctor list only on All / Pending routes */}
            {!location.pathname.includes('stats') && (
                <DoctorList doctors={doctors} setDoctors={setDoctors} />
            )}

            {/* Nested route content */}
            <div className="mt-8">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminDashboard;
