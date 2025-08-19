import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, FileText, LifeBuoy } from "lucide-react";
import {useAuth} from "../context/AuthContext";

const PatientWelcomeDashboard = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  const goToAppointment = () => {
    navigate("/appointment");
  };

  const goToRecords = () => {
    console.warn("goToRecords not yet implemented");
    // navigate("/records");
  };

  const goToSupport = () => {
    console.warn("goToSupport not yet implemented");
    // navigate("/support");
  };


  return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-6 shadow-md">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-sm mt-1 opacity-90">
            Manage your healthcare activities with ease
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-8">
          <div className="max-w-5xl mx-auto">
            {/* Welcome Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                👋 Welcome back, {user?.name || "Patient"}!
              </h2>
              <p className="text-gray-600 mb-2">
                Manage your appointments, access medical records, and get support —
                all in one place.
              </p>
              <p className="text-gray-600 mb-6">
                Thank you for trusting our healthcare services!
              </p>
              <button
                  onClick={goToAppointment}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-md"
              >
                Book an Appointment
              </button>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Appointments */}
              <div
                  onClick={goToAppointment}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform text-center"
              >
                <CalendarDays className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Appointments
                </h3>
                <p className="text-gray-600 text-sm">
                  Book, reschedule, or view your upcoming appointments.
                </p>
              </div>

              {/* Medical Records */}
              <div
                  onClick={goToRecords}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform text-center"
              >
                <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Medical Records
                </h3>
                <p className="text-gray-600 text-sm">
                  Securely access your health history and reports.
                </p>
              </div>

              {/* Support */}
              <div
                  onClick={goToSupport}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform text-center"
              >
                <LifeBuoy className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Contact our support team for any healthcare assistance.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default PatientWelcomeDashboard;
