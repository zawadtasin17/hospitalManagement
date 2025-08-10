import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardOverview({ doctorId }) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:8080/doctors';

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/${doctorId}/dashboard`);
        setDashboard(res.data);
        setLoading(false);
      } catch {
        setError('Failed to load dashboard data.');
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [doctorId]);

  if (loading) return <div className="text-center py-8 text-gray-600">Loading Dashboard Overview...</div>;
  if (error) return <div className="text-center py-8 text-red-600 font-semibold">{error}</div>;

  return (
    <section className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Dashboard Overview</h2>

      {dashboard ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          {/* Appointments by Week */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b-2 border-indigo-300 pb-2">
              Appointments by Week
            </h3>
            <ul className="space-y-2 text-gray-700">
              {dashboard.appointmentsByWeek &&
                Object.entries(dashboard.appointmentsByWeek).map(([week, count]) => (
                  <li
                    key={week}
                    className="p-3 rounded-md hover:bg-indigo-50 transition-colors cursor-default"
                  >
                    <span className="font-medium">Week {week}:</span> {count} appointment{count !== 1 ? 's' : ''}
                  </li>
                ))}
            </ul>
          </div>

          {/* Appointments by Day */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b-2 border-indigo-300 pb-2">
              Appointments by Day
            </h3>
            <ul className="space-y-2 text-gray-700">
              {dashboard.appointmentsByDay &&
                Object.entries(dashboard.appointmentsByDay).map(([day, count]) => (
                  <li
                    key={day}
                    className="p-3 rounded-md hover:bg-indigo-50 transition-colors cursor-default"
                  >
                    <span className="font-medium">{day}:</span> {count} appointment{count !== 1 ? 's' : ''}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">No dashboard data available.</p>
      )}

      <h3 className="text-center text-2xl font-semibold text-indigo-800">
        Total Appointments: <span className="text-indigo-600">{dashboard?.totalAppointments || 0}</span>
      </h3>
    </section>
  );
}

export default DashboardOverview;
