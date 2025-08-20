import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiLogOut, FiUser, FiCalendar, FiBarChart2, FiGrid } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

function DoctorDashboard() {
  const { logout } = useAuth();
  const location = useLocation();

  // A helper function to style active links
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { to: "/doctordashboard/profile", label: "Profile", icon: <FiUser /> },
    { to: "/doctordashboard/appointments", label: "Upcoming Appointments", icon: <FiCalendar /> },
    { to: "/doctordashboard/stats", label: "Appointment Stats", icon: <FiBarChart2 /> },
    { to: "/doctordashboard/dashboard", label: "Dashboard Overview", icon: <FiGrid /> },
  ];

  return (
      <div className="flex min-h-screen bg-gray-900">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-900 text-white h-screen sticky top-0 flex flex-col p-6 shadow-lg">
          <h2 className="text-3xl font-extrabold text-center mb-10 border-b border-gray-700 pb-4">
            Doctor Dashboard
          </h2>
          <ul className="flex flex-col gap-2 flex-grow">
            {navItems.map(({ to, label, icon }) => (
                <li key={to}>
                  <Link
                      to={to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold transition-colors duration-200
                  ${isActive(to) ? 'bg-blue-600 shadow-lg' : 'hover:bg-gray-700 focus:bg-gray-700 focus:outline-none'}
                `}
                      tabIndex={0}
                  >
                    <span className="text-xl">{icon}</span>
                    {label}
                  </Link>
                </li>
            ))}

            <li>
              <button
                  onClick={logout}
                  className="mt-auto flex items-center gap-2 px-4 py-3 rounded-lg text-lg font-semibold bg-red-600 hover:bg-red-700 shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="Logout"
                  tabIndex={0}
              >
                <FiLogOut className="w-6 h-6" />
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* Content area where child routes render */}
        <main className="flex-1 p-10 overflow-auto max-h-screen bg-gray-500 shadow-inner rounded-l-3xl">
          <Outlet />
        </main>
      </div>
  );
}

export default DoctorDashboard;
