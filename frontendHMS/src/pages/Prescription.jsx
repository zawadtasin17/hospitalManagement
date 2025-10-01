import React, { useState, useEffect } from "react";
import {
  getPrescriptionsByPatient,
  deletePrescription,
  downloadPrescription,
  uploadPrescription,
} from "./PrescriptionService";
import { useParams } from "react-router-dom";

const Prescription = () => {
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const { patientId } = useParams();

  const doctorId = localStorage.getItem("doctorid");

  useEffect(() => {
    if (patientId) {
      fetchPatientPrescriptions(patientId);
    }
  }, [patientId]);

  const fetchPatientPrescriptions = async (id) => {
    try {
      const res = await getPrescriptionsByPatient(id);
      setPrescriptions(res.data);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    }
  };

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await uploadPrescription(doctorId, patientId, notes, file);
  //     alert("Prescription uploaded successfully");
  //     fetchPatientPrescriptions(patientId);
  //     setNotes("");
  //     setFile(null);
  //   } catch (err) {
  //     console.error("Upload failed:", err);
  //     alert("Upload failed");
  //   }
  // };
  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    try {
      const res = await uploadPrescription(doctorId, patientId, notes, file);
      alert("Prescription uploaded successfully");
      fetchPatientPrescriptions(patientId);
      setNotes("");
      setFile(null);
      console.log("Uploaded:", res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      const res = await downloadPrescription(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePrescription(id);
      alert("Prescription deleted");
      fetchPatientPrescriptions(patientId);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Prescription Management</h1>

      {/* Upload Form */}
      <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow p-4 rounded mb-6">
        <div className="mb-3">
          <label className="block font-medium">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Upload Prescription (PDF/Image)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      {/* Prescription List */}
      <h2 className="text-xl font-semibold mb-3">
        Prescriptions for Patient #{patientId}
      </h2>
      <table className="w-full border bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Doctor</th>
            <th className="p-2 border">Patient</th>
            <th className="p-2 border">File</th>
            <th className="p-2 border">Notes</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.id}</td>
              <td className="p-2 border">{p.doctorId}</td>
              <td className="p-2 border">{p.patientId}</td>
              <td className="p-2 border">{p.fileName}</td>
              <td className="p-2 border">{p.notes}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleDownload(p.id, p.fileName)}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {prescriptions.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No prescriptions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Prescription;
