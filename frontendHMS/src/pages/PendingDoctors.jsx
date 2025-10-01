import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PendingDoctors() {
    const [pendingDoctors, setPendingDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        async function fetchPendingDoctors() {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:8080/admin/doctors/pending', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPendingDoctors(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch pending doctors');
                setLoading(false);
            }
        }
        fetchPendingDoctors();
    }, [token]);

    const approveDoctor = async (doctorId) => {
        try {
            await axios.post(
                `http://localhost:8080/admin/doctors/${doctorId}/approve`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPendingDoctors((prev) => prev.filter((doc) => doc.id !== doctorId));
        } catch (err) {
            alert('Failed to approve doctor');
        }
    };

    if (loading) return <p className="text-center py-8">Loading...</p>;
    if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Pending Doctor Approvals</h1>
            {pendingDoctors.length === 0 ? (
                <p className="text-center">No pending doctor registrations.</p>
            ) : (
                <ul className="space-y-4">
                    {pendingDoctors.map((doctor) => (
                        <li
                            key={doctor.id}
                            className="p-4 border rounded-lg flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{doctor.name}</p>
                                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                            </div>
                            <button
                                onClick={() => approveDoctor(doctor.id)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Approve
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PendingDoctors;
