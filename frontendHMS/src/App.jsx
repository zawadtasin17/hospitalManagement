// src/App.jsx
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
import PatientPastAppointments from './pages/PatientPastAppointments';

// Admin pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PendingDoctorsPage from './pages/PendingDoctors';
import SystemStatsPage from './pages/SystemStats';

import { useAuth } from './context/AuthContext';

function App() {
    const { auth } = useAuth(); // get auth object from context

    return (
        <Router>
            <NavBar />
            <div className="container mx-auto p-4">
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<PatientRegistration />} />
                    <Route
                        path="/adminlogin"
                        element={
                            auth?.userType === 'admin' ? (
                                <Navigate to="/admindashboard" replace />
                            ) : (
                                <AdminLogin />
                            )
                        }
                    />

                    {/* Patient routes */}
                    <Route
                        path="/patientdashboard"
                        element={
                            auth?.userType === 'patient' ? (
                                <PatientWelcomeDashboard patientId={auth.id} />
                            ) : (
                                <Navigate to="/register" replace />
                            )
                        }
                    />
                    <Route
                        path="/appointment"
                        element={
                            auth?.userType === 'patient' ? (
                                <PatientAppointment patientId={auth.id} />
                            ) : (
                                <Navigate to="/register" replace />
                            )
                        }
                    />
                    <Route
                        path="/Patient-appointments"
                        element={
                            auth?.userType === 'patient' ? (
                                <PatientPastAppointments patientId={auth.id} />
                            ) : (
                                <Navigate to="/register" replace />
                            )
                        }
                    />

                    {/* Doctor dashboard with nested routes */}
                    <Route
                        path="/doctordashboard/*"
                        element={
                            auth?.userType === 'doctor' ? (
                                <DoctorDashboard />
                            ) : (
                                <Navigate to="/register" replace />
                            )
                        }
                    >
                        <Route index element={<DoctorProfile doctorId={auth?.id} />} />
                        <Route path="profile" element={<DoctorProfile doctorId={auth?.id} />} />
                        <Route path="appointments" element={<UpcomingAppointments doctorId={auth?.id} />} />
                        <Route path="stats" element={<AppointmentStats doctorId={auth?.id} />} />
                        <Route path="dashboard" element={<DashboardOverview doctorId={auth?.id} />} />
                    </Route>

                    {/* Admin dashboard with nested routes */}
                    <Route
                        path="/admindashboard/*"
                        element={
                            auth?.userType === 'admin' ? (
                                <AdminDashboard />
                            ) : (
                                <Navigate to="/adminlogin" replace />
                            )
                        }
                    >
                        <Route path="pending" element={<PendingDoctorsPage />} />
                        <Route path="stats" element={<SystemStatsPage />} />
                    </Route>

                    {/* Catch-all fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
