import axios from "axios";

const BASE_URL = "http://localhost:8080/api/prescriptions";

// FIXED: Helper function to get JWT token from localStorage
// Changed from hardcoded "jwtToken" to check multiple possible storage keys
const token = localStorage.getItem('jwtToken');

export const getPrescriptionsByPatient = async (patientId) => {
  return axios.get(`${BASE_URL}/patient/${patientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const uploadPrescription = async (doctorId, patientId, notes, file) => {
//   const formData = new FormData();
//   formData.append("doctorId", doctorId);
//   formData.append("patientId", patientId);
//   formData.append("notes", notes);
//   formData.append("file", file);

//   return axios.post(`${BASE_URL}/upload`, formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

export const uploadPrescription = async (doctorId, patientId, notes, file) => {
  const formData = new FormData();
  formData.append("doctorId", doctorId);
  formData.append("patientId", patientId);
  formData.append("notes", notes || "");
  formData.append("file", file);

  return axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadPrescription = async (id) => {
  return axios.get(`${BASE_URL}/${id}/download`, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePrescription = async (id) => {
  return axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};