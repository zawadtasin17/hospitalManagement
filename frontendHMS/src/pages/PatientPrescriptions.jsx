import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PatientPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const token = localStorage.getItem("jwtToken");

    const { id } = useParams();
    const patientId = id || localStorage.getItem("patientid");  // fallback

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/prescriptions/patient/${patientId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch prescriptions");
                }
                const data = await response.json();
                setPrescriptions(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPrescriptions();
    }, [id, token]);

    // const handleDownload = async (prescriptionId) => {
    //     try {
    //         const response = await fetch(
    //             `http://localhost:8080/api/prescriptions/${prescriptionId}/download`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         if (!response.ok) {
    //             throw new Error("Failed to download prescription");
    //         }
    //         const blob = await response.blob();
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = `prescription_${prescriptionId}.pdf`; // Default file name
    //         a.click();
    //     } catch (error) {
    //         console.error("Error downloading file:", error);
    //     }
    // };
    const handleDownload = async (prescriptionId, fileName) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/prescriptions/${prescriptionId}/download`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!response.ok) throw new Error("Failed to download prescription");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName; // <-- use actual file name
            a.click();

            window.URL.revokeObjectURL(url); // optional cleanup
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Prescriptions</h2>
            {prescriptions.length === 0 ? (
                <p>No prescriptions found.</p>
            ) : (
                <ul className="space-y-3">
                    {prescriptions.map((p) => (
                        <li key={p.id} className="p-3 border rounded shadow">
                            <p><strong>Notes:</strong> {p.notes || "N/A"}</p>
                            <p><strong>File:</strong> {p.fileName}</p>
                            <button
                                className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                onClick={() => handleDownload(p.id, p.fileName)}
                            >
                                Download
                            </button>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PatientPrescriptions;
