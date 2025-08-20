import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope, User } from "lucide-react";

function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 text-white text-center p-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <h2 className="text-5xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
                    Healthcare Management System
                </h2>
                <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
                    Streamline patient care, doctor management, and appointment scheduling
                    with the power of intelligent automation.
                </p>
                <Link
                    to="/register"
                    className="inline-block px-8 py-4 bg-white text-green-600 text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:bg-green-50 transition-all"
                >
                    Register Now
                </Link>
            </section>

            {/* Services Section */}
            <section className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-12">
                    Our Smart Healthcare Services
                </h2>

                {/* Services Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Patient Service */}
                    <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                        <div className="flex justify-center mb-6">
                            <User className="w-12 h-12 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                            Patient Services
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Manage patient profiles, appointments, and medical history
                            effortlessly with AI-powered insights.
                        </p>
                        <Link
                            to="/register"
                            className="text-green-600 font-semibold hover:text-green-800"
                        >
                            Learn More →
                        </Link>
                    </div>

                    {/* Doctor Service */}
                    <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                        <div className="flex justify-center mb-6">
                            <Stethoscope className="w-12 h-12 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                            Doctor Services
                        </h3>
                        <p className="text-gray-600 mb-6">
                            AI-assisted scheduling, availability tracking, and better doctor–
                            patient coordination.
                        </p>
                        <Link
                            to="/register"
                            className="text-green-600 font-semibold hover:text-green-800"
                        >
                            Learn More →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 text-white text-center py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-20"></div>
                <h3 className="text-4xl font-extrabold mb-6">
                    Get Started with Smart Healthcare Today
                </h3>
                <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
                    Empowering hospitals, doctors, and patients with intelligent tools to
                    improve healthcare outcomes.
                </p>
                <Link
                    to="/register"
                    className="inline-block px-8 py-4 bg-white text-green-700 text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:bg-green-50 transition-all"
                >
                    🌿 Start Now
                </Link>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-gray-300 text-center py-6">
                <p>
                    &copy; 2025 Healthcare Management System. Built with ❤️ and powered by
                    AI.
                </p>
            </footer>
        </div>
    );
}

export default Home;
