import React, { useState } from 'react';
import axios from 'axios';

function PatientRegistration() {
    const [patient, setPatient] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/patients', patient);
            alert('Patient Registered Successfully!');
            setPatient({ name: '', email: '', phone: '' });
        } catch (error) {
            alert('Error registering patient');
        }
    };

    return (
        <div>
            <h2>Register as a Patient</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={patient.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={patient.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone: </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={patient.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default PatientRegistration;
