import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function DoctorDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen p-4 sticky top-0">
        <h2 className="text-2xl font-bold text-center mb-8">Doctor Dashboard</h2>
        <ul>
          <li>
            <Link to="/doctordashboard/profile" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/doctordashboard/appointments" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">
              Upcoming Appointments
            </Link>
          </li>
          <li>
            <Link to="/doctordashboard/stats" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">
              Appointment Stats
            </Link>
          </li>
          <li>
            <Link to="/doctordashboard/dashboard" className="block p-3 mb-3 hover:bg-gray-700 rounded-md">
              Dashboard Overview
            </Link>
          </li>
        </ul>
      </div>

      {/* Content area where child routes render */}
      <main className="flex-1 p-8 overflow-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorDashboard;
