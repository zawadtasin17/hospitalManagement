import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import PatientRegistration from './components/PatientRegistration';
import PatientDashboard from './components/PatientDashboard';

function App() {
    return (
        <Router>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<h1>Welcome to the Healthcare Management System</h1>} />
                    <Route path="/register" element={<PatientRegistration />} />
                    <Route path="/dashboard" element={<PatientDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
