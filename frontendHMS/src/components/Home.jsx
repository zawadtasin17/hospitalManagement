import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-center p-16">
                <h2 className="text-4xl font-bold mb-4">Welcome to the Healthcare Management System</h2>
                <p className="text-xl mb-6">A system to manage patients, doctors, and appointments with ease.</p>
                <Link
                    to="/register"
                    className="inline-block px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 transition-all"
                >
                    Register Now
                </Link>
            </section>

            {/* Services Section */}
            <section className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Services</h2>

                {/* Services Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Patient Service */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Patient Services</h3>
                        <p className="text-gray-600 mb-4">Manage patient registrations, appointments, and medical records efficiently.</p>
                        <Link to="/register" className="text-green-500 hover:text-green-700">Learn More &rarr;</Link>
                    </div>

                    {/* Doctor Service */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Doctor Services</h3>
                        <p className="text-gray-600 mb-4">Easily manage doctor registrations, schedules, and appointments.</p>
                        <Link to="/register" className="text-green-500 hover:text-green-700">Learn More &rarr;</Link>
                    </div>

                    {/* Appointment Service */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Appointment Services</h3>
                        <p className="text-gray-600 mb-4">Schedule, reschedule, or cancel appointments with ease.</p>
                        <Link to="/register" className="text-green-500 hover:text-green-700">Learn More &rarr;</Link>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-gray-800 text-white text-center py-16">
                <h3 className="text-3xl font-bold mb-4">Get Started with Our Healthcare System</h3>
                <p className="text-xl mb-8">Join us today to streamline your healthcare services and improve patient outcomes.</p>
                <Link
                    to="/register"
                    className="inline-block px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 transition-all"
                >
                    Start Now
                </Link>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-white text-center py-4">
                <p>&copy; 2025 Healthcare Management System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
