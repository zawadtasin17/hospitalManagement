import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PatientPastAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();
  const patientId = localStorage.getItem("patientid"); // Get patient ID from localStorage
  const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/appointments/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Previous Appointments</h2>
      {appointments.length === 0 ? (
        <p>No previous appointments found.</p>
      ) : (
        // <ul className="space-y-3">
        //   {appointments.map((app) => (
        //     <li key={app.id} className="p-3 border rounded shadow">
        //       <p><strong>Doctor:</strong> {app.doctor?.name || "Unknown"}</p>
        //       <p>
        //         <strong>Date:</strong>{" "}
        //         {app.appointmentDateTime
        //           ? new Date(app.appointmentDateTime).toLocaleString()
        //           : "N/A"}
        //       </p>
        //       <p><strong>Status:</strong> {app.status}</p>
        //     </li>
        //   ))}
        // </ul>
        <ul className="space-y-3">
          {appointments.map((app) => (
            <li key={app.id} className="p-3 border rounded shadow">
              <p><strong>Doctor:</strong> {app.doctor?.name || "Unknown"}</p>
              <p>
                <strong>Date:</strong>{" "}
                {app.appointmentDateTime
                  ? new Date(app.appointmentDateTime).toLocaleString()
                  : "N/A"}
              </p>
              <p><strong>Status:</strong> {app.status}</p>

              {/* Prescription Button */}
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => navigate(`/patient/prescriptions/${patientId}`)}
              >
                View Prescription
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientPastAppointments