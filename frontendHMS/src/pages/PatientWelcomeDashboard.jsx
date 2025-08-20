import React from "react";
import { useNavigate } from "react-router-dom";

const PatientWelcomeDashboard = () => {
  const navigate = useNavigate();

  const goToAppointment = () => {
    navigate("/appointment");
  };

  const goToPatientAppointments = () => {
    navigate("/Patient-appointments");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <p className="text-sm mt-1">Manage your healthcare activities with ease</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to the Patient Dashboard!
          </h2>
          <p className="text-gray-600 mb-2">
            Here you can manage your appointments, view medical records, and more.
          </p>
          <p className="text-gray-600 mb-2">
            For any assistance, please contact our support team.
          </p>
          <p className="text-gray-600 mb-6">
            Thank you for choosing our healthcare services!
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={goToAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
            >
              Take Appointments
            </button>

            <button
              onClick={goToPatientAppointments}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
            >
              Your Appointments
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientWelcomeDashboard;
