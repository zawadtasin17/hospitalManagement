import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SystemStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        async function fetchStats() {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:8080/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch system stats');
                setLoading(false);
            }
        }
        fetchStats();
    }, [token]);

    if (loading) return <p className="text-center py-8">Loading...</p>;
    if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">System Statistics</h1>
            {stats ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-white shadow rounded-lg">
                        <p className="text-gray-600">Total Patients</p>
                        <p className="text-2xl font-bold">{stats.totalPatients}</p>
                    </div>
                    <div className="p-4 bg-white shadow rounded-lg">
                        <p className="text-gray-600">Total Doctors</p>
                        <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                    </div>
                    <div className="p-4 bg-white shadow rounded-lg">
                        <p className="text-gray-600">Total Appointments</p>
                        <p className="text-2xl font-bold">{stats.totalAppointments}</p>
                    </div>
                </div>
            ) : (
                <p className="text-center">No stats available</p>
            )}
        </div>
    );
}

export default SystemStats;
