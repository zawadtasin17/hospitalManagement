import React from 'react';
import axios from 'axios';

function DoctorList({ doctors, setDoctors }) {
    const token = localStorage.getItem('jwtToken');

    const handleAction = async (doctorId, action) => {
        try {
            await axios.put(`http://localhost:8080/admin/doctors/${doctorId}/${action}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Update list locally
            setDoctors(doctors.filter((doc) => doc.id !== doctorId));
            alert(`Doctor ${action}ed successfully`);
        } catch (err) {
            alert('Action failed');
        }
    };

    if (!doctors.length) return <p className="text-center text-gray-500 italic">No doctors pending approval.</p>;

    return (
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
            <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Specialty</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
            </tr>
            </thead>
            <tbody>
            {doctors.map((doctor) => (
                <tr key={doctor.id} className="border-t">
                    <td className="p-3">{doctor.name}</td>
                    <td className="p-3">{doctor.email}</td>
                    <td className="p-3">{doctor.specialty}</td>
                    <td className="p-3">{doctor.status}</td>
                    <td className="p-3 space-x-2">
                        {doctor.status === 'Pending' && (
                            <>
                                <button
                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                    onClick={() => handleAction(doctor.id, 'approve')}
                                >
                                    Approve
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleAction(doctor.id, 'reject')}
                                >
                                    Reject
                                </button>
                            </>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default DoctorList;
