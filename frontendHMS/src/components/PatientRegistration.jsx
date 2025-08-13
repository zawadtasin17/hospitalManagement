import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // your auth hook

function PatientRegistration() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: 'patient', // default to patient
        userAction: 'register', // 'register' or 'login'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginSuccess = (responseData) => {
        if (!responseData.id || !responseData.userType) {
            alert('Invalid login response from server');
            return;
        }
        //console.log("Login response data:", response.data);

        login({
            id: responseData.id,
            userType: responseData.userType,
        });

        if (responseData.userType === 'patient') {
            localStorage.setItem('jwtToken', responseData.token);
            console.log(responseData.token);
            localStorage.setItem('patientid', responseData.id);
            console.log(responseData.id);
            navigate('/patientdashboard');
        } else if (responseData.userType === 'doctor') {
            localStorage.setItem('jwtToken', responseData.token);
            console.log(responseData.token);
            localStorage.setItem('doctorid', responseData.id);
            console.log(responseData.id);
            navigate('/doctordashboard');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.userAction === 'register') {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match");
                return;
            }
            try {
                const endpoint = formData.userType === 'patient'
                    ? 'http://localhost:8080/auth/register/patient'
                    : 'http://localhost:8080/auth/register/doctor';

                await axios.post(endpoint, {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                });

                alert(`${formData.userType === 'patient' ? 'Patient' : 'Doctor'} Registered Successfully!`);

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    userType: formData.userType, // keep same userType
                    userAction: 'login', // switch to login after register
                });
            } catch (error) {
                alert('Error registering user');
            }
        } else if (formData.userAction === 'login') {
            try {
                const endpoint = formData.userType === 'patient'
                    ? 'http://localhost:8080/auth/login/patient'
                    : 'http://localhost:8080/auth/login/doctor';

                const loginData = {
                    email: formData.email,
                    password: formData.password,
                };

                const response = await axios.post(endpoint, loginData);

                alert('Logged in successfully!');

                handleLoginSuccess(response.data);
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
                {/* User Type Selection - Always visible */}
                <div className="mb-4">
                    <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                        {formData.userAction === 'register' ? 'Register as:' : 'Login as:'}
                    </label>
                    <select
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div>

                {/* Name input only during registration */}
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

                {/* Email input */}
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

                {/* Phone input only during registration */}
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

                {/* Password input */}
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

                {/* Confirm Password only during registration */}
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

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600"
                >
                    {formData.userAction === 'register' ? 'Register' : 'Login'}
                </button>
            </form>

            {/* Switch form action */}
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