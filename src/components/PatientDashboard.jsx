import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientDashboard() {
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        // Fetch patient details (replace with actual API call)
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8080/patients/1'); // Assuming patient ID is 1
                setPatient(response.data);
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                alert('Error fetching patient data');
            }
        };

        fetchPatientDetails();
    }, []);

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Patient Dashboard</h2>
            <p>Name: {patient.name}</p>
            <p>Email: {patient.email}</p>
            <p>Phone: {patient.phone}</p>
        </div>
    );
}

export default PatientDashboard;
