import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import PatientRegistration from './components/PatientRegistration';
import PatientDashboard from './components/PatientDashboard';
import PatientWelcomeDashboard from './pages/PatientWelcomeDashboard';
import DoctorDashboard from './components/DoctorDashboard'; // layout component with <Outlet />
import DoctorProfile from './pages/DoctorProfile';
import UpcomingAppointments from './pages/UpcomingAppointments';
import AppointmentStats from './pages/AppointmentStats';
import DashboardOverview from './pages/DashboardOverview';
import PatientAppointment from './pages/PatientAppointment';

import { useAuth } from './context/AuthContext';
import PatientPastAppointments from './pages/PatientPastAppointments';

function App() {
  const { user } = useAuth();

  if (!user) {
    // Optionally redirect to register if no user logged in
    return (
      <Router>
        <NavBar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/register" element={<PatientRegistration />} />
            <Route path="*" element={<Navigate to="/register" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <NavBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<PatientRegistration />} />

          {/* Doctor dashboard with nested routes */}
          <Route
            path="/doctordashboard/*"
            element={
              user.userType === 'doctor' ? (
                <DoctorDashboard />
              ) : (
                <PatientDashboard patientId={user.id} />
              )
            }
          >
            {/* Nested routes */}
            <Route
              index
              element={<DoctorProfile doctorId={user.id} />}
            />
            <Route
              path="profile"
              element={<DoctorProfile doctorId={user.id} />}
            />
            <Route
              path="appointments"
              element={<UpcomingAppointments doctorId={user.id} />}
            />
            <Route
              path="stats"
              element={<AppointmentStats doctorId={user.id} />}
            />
            <Route
              path="dashboard"
              element={<DashboardOverview doctorId={user.id} />}
            />
          </Route>

          {/* Patient routes */}
          <Route
            path="/patientdashboard"
            element={
              user.userType === 'patient' ? (
                <PatientWelcomeDashboard patientId={user.id} />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />
          <Route
            path="/appointment"
            element={
              user.userType === 'patient' ? (
                <PatientAppointment patientId={user.id} />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />
          <Route
            path="/Patient-appointments"
            element={
              user.userType === 'patient' ? (
                <PatientPastAppointments patientId={user.id} />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />

          {/* Catch all unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
