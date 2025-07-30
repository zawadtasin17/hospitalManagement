import React, { useState } from 'react';
import axios from 'axios';

function PatientRegistration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: 'patient', // Default to 'patient'
        userAction: 'register', // Can be 'register' or 'login'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.userAction === 'register') {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match");
                return;
            }
            try {
                const endpoint =
                    formData.userAction === 'register'
                        ? formData.userType === 'patient'
                            ? 'http://localhost:8080/auth/register/patient'
                            : 'http://localhost:8080/auth/register/doctor'
                        : formData.userType === 'patient'
                            ? 'http://localhost:8080/auth/login/patient'
                            : 'http://localhost:8080/auth/login/doctor';

                const response = await axios.post(endpoint, formData);
                alert(`${formData.userType === 'patient' ? 'Patient' : 'Doctor'} Registered Successfully!`);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    userType: 'patient',
                    userAction: 'login', // Switch to login after registration
                });
            } catch (error) {
                alert('Error registering user');
            }
        } else if (formData.userAction === 'login') {
            try {
                const loginData = {
                    email: formData.email,
                    password: formData.password,
                };

                const endpoint =
                    formData.userAction === 'register'
                        ? formData.userType === 'patient'
                            ? 'http://localhost:8080/auth/register/patient'
                            : 'http://localhost:8080/auth/register/doctor'
                        : formData.userType === 'patient'
                            ? 'http://localhost:8080/auth/login/patient'
                            : 'http://localhost:8080/auth/login/doctor';

                const response = await axios.post(endpoint, loginData);
                alert('Logged in successfully!');
                // Here, handle user session or redirect to a logged-in page
            } catch (error) {
                alert('Error logging in');
            }
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {formData.userAction === 'register' ? 'Register as a ' : 'Login to your '} {formData.userType === 'patient' ? 'Patient' : 'Doctor'}
            </h2>

            <form onSubmit={handleSubmit}>
                {/* User Type Selection */}
                <div className="mb-4">
                    {formData.userAction === 'register' && (
                        <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Register as:</label>
                    )}
                    <select
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        disabled={formData.userAction === 'login' && formData.userAction === 'patient'} // Disable during login
                    >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div>

                {/* Name Field - Only for Registration */}
                {formData.userAction === 'register' && (
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}

                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Phone Field */}
                {formData.userAction === 'register' && (
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}

                {/* Password Field */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Confirm Password Field - Only for Registration */}
                {formData.userAction === 'register' && (
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600"
                >
                    {formData.userAction === 'register' ? 'Register' : 'Login'}
                </button>
            </form>

            {/* Switch Between Login and Register */}
            <div className="mt-4 text-center">
                {formData.userAction === 'register' ? (
                    <p>
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, userAction: 'login' })}
                            className="text-blue-500"
                        >
                            Login
                        </button>
                    </p>
                ) : (
                    <p>
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, userAction: 'register' })}
                            className="text-blue-500"
                        >
                            Register
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}

export default PatientRegistration;
