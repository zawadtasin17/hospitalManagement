import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DoctorProfile({ doctorId }) {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editProfileData, setEditProfileData] = useState({});

  const BASE_URL = 'http://localhost:8080/doctors';

  const token = localStorage.getItem('jwtToken');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(`${BASE_URL}/${doctorId}/profile`, config);
        setProfile(res.data);
        setEditProfileData(res.data);
        console.log('JWT token:', token);
      } catch (error) {
        alert('Failed to load profile');
      }
    }
    fetchProfile();
  }, [doctorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailableDaysChange = (e) => {
    const daysArray = e.target.value.split(',').map((d) => d.trim());
    setEditProfileData((prev) => ({ ...prev, availableDays: daysArray }));
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/${doctorId}/profile`, editProfileData, config);
      setProfile(res.data);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch {
      alert('Failed to update profile.');
    }
  };

  const handleCancelEdit = () => {
    setEditProfileData(profile);
    setEditMode(false);
  };

  if (!profile) return <div className="text-center py-10 text-gray-600">Loading Profile...</div>;

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Profile</h1>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded shadow transition-colors duration-200"
            aria-label="Edit Profile"
          >
            Edit
          </button>
        )}
      </div>

      {editMode ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveProfile();
          }}
          className="space-y-5"
        >
          {/* Keep these three inputs as before */}
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Phone', name: 'phone', type: 'text' },
          ].map(({ label, name, type }) => (
            <label key={name} className="block">
              <span className="text-gray-700 font-semibold mb-1 block">{label}:</span>
              <input
                type={type}
                name={name}
                value={editProfileData[name] || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </label>
          ))}

          {/* Specialty as select */}
          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">Specialty:</span>
            <select
              name="specialty"
              value={editProfileData.specialty || ''}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="" disabled>
                Select Specialty
              </option>
              {[
                "CARDIOLOGY",
                "DERMATOLOGY",
                "NEUROLOGY",
                "PEDIATRICS",
                "GENERAL_PHYSICIAN",
                "ORTHOPEDICS",
                "PSYCHIATRY",
                "ONCOLOGY",
                "GYNECOLOGY",
                "UROLOGY",
                "ENT",
                "GASTROENTEROLOGY",
              ].map((spec) => (
                <option key={spec} value={spec}>
                  {spec.replace('_', ' ')}
                </option>
              ))}
            </select>
          </label>

          {/* Available Days as multiple select */}
          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">Available Days:</span>
            <div className="flex flex-wrap gap-3">
              {[
                "SATURDAY",
                "SUNDAY",
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
              ].map((day) => {
                const isChecked = editProfileData.availableDays?.includes(day) || false;
                return (
                  <label key={day} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="availableDays"
                      value={day}
                      checked={isChecked}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setEditProfileData((prev) => {
                          let newDays = prev.availableDays ? [...prev.availableDays] : [];
                          if (checked) {
                            if (!newDays.includes(day)) newDays.push(day);
                          } else {
                            newDays = newDays.filter((d) => d !== day);
                          }
                          return { ...prev, availableDays: newDays };
                        });
                      }}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>{day.charAt(0) + day.slice(1).toLowerCase()}</span>
                  </label>
                );
              })}
            </div>
          </label>


          <div className="grid grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700 font-semibold mb-1 block">Available From:</span>
              <input
                type="time"
                name="availableFrom"
                value={editProfileData.availableFrom || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-semibold mb-1 block">Available To:</span>
              <input
                type="time"
                name="availableTo"
                value={editProfileData.availableTo || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </label>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow transition-colors duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <strong className="font-semibold text-gray-900">Name:</strong> {profile.name}
          </p>
          <p>
            <strong className="font-semibold text-gray-900">Email:</strong> {profile.email}
          </p>
          <p>
            <strong className="font-semibold text-gray-900">Phone:</strong> {profile.phone}
          </p>
          <p>
            <strong className="font-semibold text-gray-900">Specialty:</strong> {profile.specialty}
          </p>
          <p>
            <strong className="font-semibold text-gray-900">Available Days:</strong>{' '}
            {profile.availableDays?.join(', ')}
          </p>
          <p>
            <strong className="font-semibold text-gray-900">Available Time:</strong>{' '}
            {profile.availableFrom} - {profile.availableTo}
          </p>
        </div>
      )}
    </section>
  );
}

export default DoctorProfile;