import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PatientRegistration from './components/PatientRegistration';
import PatientDashboard from './components/PatientDashboard';
import PatientWelcomeDashboard from './pages/PatientWelcomeDashboard';
import PatientAppointment from './pages/PatientAppointment';

function App() {
    return (
        <Router>
            <NavBar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<PatientRegistration />} />
                    <Route path="/dashboard" element={<PatientDashboard />} />
                    <Route path="/patientdashboard" element={<PatientWelcomeDashboard />} />
                    <Route path="/appointment" element={<PatientAppointment />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
