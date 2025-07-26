import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ userType }) {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white h-screen p-4">
                <h2 className="text-2xl font-bold text-center mb-8">Dashboard</h2>
                <ul>
                    <li>
                        <Link to="/dashboard" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/appointments" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">
                            Appointments
                        </Link>
                    </li>
                    {userType === 'doctor' && (
                        <li>
                            <Link to="/patients" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">
                                Patients
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

                {/* Overview Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Appointments Overview</h3>
                        <p className="text-lg">Total Appointments: 10</p>
                        <p className="text-lg">Upcoming: 5</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
                        <p className="text-lg">No new activities</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Notifications</h3>
                        <p className="text-lg">You have 2 new messages</p>
                    </div>
                </section>

                {/* Recent Appointments/Activities Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Recent Appointments</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <table className="w-full table-auto">
                            <thead>
                            <tr>
                                <th className="p-2 text-left">Patient Name</th>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="p-2">John Doe</td>
                                <td className="p-2">Sept 20, 2025</td>
                                <td className="p-2 text-green-500">Confirmed</td>
                            </tr>
                            <tr>
                                <td className="p-2">Jane Smith</td>
                                <td className="p-2">Sept 22, 2025</td>
                                <td className="p-2 text-yellow-500">Pending</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
