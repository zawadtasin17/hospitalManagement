import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpcomingAppointments({ doctorId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:8080';

  useEffect(() => {
    // Load appointments from localStorage first (if any)
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
      setLoading(false); // Show cached data immediately
    }

    // Fetch fresh appointments from backend
    async function fetchAppointments() {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/doctors/${doctorId}/appointments/upcoming`);
        setAppointments(res.data);
        localStorage.setItem('appointments', JSON.stringify(res.data)); // Save fresh data
        setLoading(false);
      } catch (err) {
        setError('Failed to load upcoming appointments.');
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [doctorId]);

  // Format ISO datetime string to readable local string
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return 'Invalid Date';

    try {
      const [datePart, timePart] = dateTimeStr.split('T');
      if (!datePart || !timePart) return 'Invalid Date';

      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);

      const dateObj = new Date(year, month - 1, day, hour, minute, second || 0);
      if (isNaN(dateObj.getTime())) return 'Invalid Date';

      return dateObj.toLocaleString();
    } catch {
      return 'Invalid Date';
    }
  };

  // Update appointment status - can be 'Cancelled' or 'Completed'
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this appointment as ${newStatus}?`)) return;

    try {
      const res = await axios.put(
        `${BASE_URL}/appointments/${appointmentId}/status`,
        null,
        { params: { status: newStatus } }
      );
      const updatedAppt = res.data;

      // Update state & localStorage with updated appointment
      setAppointments(prev => {
        const updatedList = prev.map(appt => (appt.id === appointmentId ? updatedAppt : appt));
        localStorage.setItem('appointments', JSON.stringify(updatedList));
        return updatedList;
      });
    } catch (error) {
      alert(`Failed to update appointment status to ${newStatus}. Please try again.`);
    }
  };

  if (loading) return <div>Loading Upcoming Appointments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <table className="w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Patient Name</th>
              <th className="p-2 text-left">Date & Time</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b">
                <td className="p-2">{appt.patient?.name || 'N/A'}</td>
                <td className="p-2">{formatDateTime(appt.appointmentDateTime)}</td>
                <td className="p-2">{appt.status || 'Scheduled'}</td>
                <td className="p-2 space-x-2">
                  {appt.status === 'Scheduled' ? (
                    <>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => updateAppointmentStatus(appt.id, 'Cancelled')}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => updateAppointmentStatus(appt.id, 'Completed')}
                      >
                        Complete
                      </button>
                    </>
                  ) : (
                    <span
                      className={`font-semibold ${
                        appt.status === 'Completed' ? 'text-green-600' :
                        appt.status === 'Cancelled' ? 'text-gray-500 italic' : ''
                      }`}
                    >
                      {appt.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default UpcomingAppointments;
