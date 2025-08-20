import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaCalendarCheck, FaStethoscope } from "react-icons/fa";
import {useAuth} from "../context/AuthContext.jsx";
import { FiLogOut } from "react-icons/fi";

const PatientWelcomeDashboard = () => {
  const navigate = useNavigate();
  const {user, logout} = useAuth();

  const goToAppointment = () => {
    navigate("/appointment");
  };

  const goToPatientAppointments = () => {
    navigate("/Patient-appointments");
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white p-8 shadow-lg flex items-center justify-center gap-4">
          <FaStethoscope className="text-4xl animate-bounce" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Patient Dashboard</h1>
            <p className="text-base mt-1 font-medium opacity-90">Manage your healthcare activities with ease</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 flex justify-center items-center gap-2">
              <span className="animate-wave origin-[70%_70%]">👋</span>
              Welcome back, {user?.name || 'Patient'}
            </h2>
            <p className="text-gray-700 mb-2">
              Manage appointments, view your records, and access health services quickly.
            </p>
            <p className="text-gray-600 mb-6">
              For assistance, contact <span className="underline font-medium text-blue-700 cursor-pointer">support</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              {/* Take Appointments Card */}
              <div
                  onClick={goToAppointment}
                  className="cursor-pointer bg-blue-100 hover:bg-blue-200 active:bg-blue-300 transition rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-2xl group"
              >
                <FaUserMd className="text-4xl mb-2 text-blue-600 group-hover:scale-110 transition" />
                <div className="text-xl font-bold text-blue-700 mb-1">Take Appointments</div>
                <div className="text-gray-600 text-sm mb-2">Book a session with our expert doctors easily.</div>
                <span className="inline-block mt-2 bg-blue-600 group-hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
                Book Now
              </span>
              </div>

              {/* Your Appointments Card */}
              <div
                  onClick={goToPatientAppointments}
                  className="cursor-pointer bg-indigo-100 hover:bg-indigo-200 active:bg-indigo-300 transition rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-2xl group"
              >
                <FaCalendarCheck className="text-4xl mb-2 text-indigo-700 group-hover:scale-110 transition" />
                <div className="text-xl font-bold text-indigo-800 mb-1">Your Appointments</div>
                <div className="text-gray-600 text-sm mb-2">View, manage, or cancel your upcoming visits.</div>
                <span className="inline-block mt-2 bg-indigo-700 group-hover:bg-indigo-900 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
                View Appointments
              </span>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white font-semibold shadow-md transition duration-200"
                  aria-label="Logout"
              >
                <FiLogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
  );
};

export default PatientWelcomeDashboard;
