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

  if (!profile)
    return (
        <div className="text-center py-12 text-gray-400 text-lg font-mono italic">
          Loading Profile...
        </div>
    );

  return (
      <section className="max-w-3xl mx-auto p-10 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 text-gray-300 font-sans">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-400 tracking-wide font-mono drop-shadow-lg">
            Doctor Profile
          </h1>
          {!editMode && (
              <button
                  onClick={() => setEditMode(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-3xl shadow-lg transition duration-300"
                  aria-label="Edit Profile"
              >
                Edit
              </button>
          )}
        </header>

        {editMode ? (
            <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveProfile();
                }}
                className="space-y-8"
            >
              {[{ label: 'Name', name: 'name', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Phone', name: 'phone', type: 'text' }].map(({ label, name, type }) => (
                  <label key={name} className="block">
                    <span className="block mb-2 text-lg font-semibold tracking-wide text-indigo-300 drop-shadow-md">{label}:</span>
                    <input
                        type={type}
                        name={name}
                        value={editProfileData[name] || ''}
                        onChange={handleInputChange}
                        required
                        spellCheck={false}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                        className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-6 py-4 text-lg font-medium text-indigo-200 placeholder-indigo-500 placeholder-opacity-50 focus:outline-none focus:ring-4 focus:ring-indigo-500 shadow-inner transition"
                    />
                  </label>
              ))}

              <label className="block">
            <span className="block mb-2 text-lg font-semibold tracking-wide text-indigo-300 drop-shadow-md">
              Specialty:
            </span>
                <select
                    name="specialty"
                    value={editProfileData.specialty || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-6 py-4 text-lg font-medium text-indigo-200 placeholder-indigo-500 placeholder-opacity-50 focus:outline-none focus:ring-4 focus:ring-indigo-500 shadow-inner transition"
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
                      <option
                          key={spec}
                          value={spec}
                          className="bg-gray-900 text-indigo-300"
                      >
                        {spec.replace('_', ' ')}
                      </option>
                  ))}
                </select>
              </label>

              <fieldset className="mb-8">
                <legend className="mb-4 text-xl font-semibold tracking-wide text-indigo-400 drop-shadow-lg">
                  Available Days:
                </legend>
                <div className="flex flex-wrap gap-6">
                  {[
                    "SATURDAY",
                    "SUNDAY",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                  ].map((day) => {
                    const checked = editProfileData.availableDays?.includes(day) || false;
                    return (
                        <label
                            key={day}
                            className="inline-flex items-center space-x-4 cursor-pointer select-none"
                        >
                          <input
                              type="checkbox"
                              name="availableDays"
                              value={day}
                              checked={checked}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setEditProfileData((prev) => {
                                  let days = prev.availableDays ? [...prev.availableDays] : [];
                                  if (isChecked) {
                                    if (!days.includes(day)) days.push(day);
                                  } else {
                                    days = days.filter((d) => d !== day);
                                  }
                                  return { ...prev, availableDays: days };
                                });
                              }}
                              className="form-checkbox h-6 w-6 rounded-lg text-indigo-500 focus:ring-indigo-400 transition"
                          />
                          <span className="text-lg font-semibold text-indigo-300">
                      {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
                    </span>
                        </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid grid-cols-2 gap-10">
                <label className="block">
              <span className="block mb-2 text-lg font-semibold tracking-wide text-indigo-400 drop-shadow-lg">
                Available From:
              </span>
                  <input
                      type="time"
                      name="availableFrom"
                      value={editProfileData.availableFrom || ''}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-6 py-4 text-lg font-medium text-indigo-200 placeholder-indigo-600 placeholder-opacity-40 focus:outline-none focus:ring-4 focus:ring-indigo-500 shadow-inner transition"
                  />
                </label>
                <label className="block">
              <span className="block mb-2 text-lg font-semibold tracking-wide text-indigo-400 drop-shadow-lg">
                Available To:
              </span>
                  <input
                      type="time"
                      name="availableTo"
                      value={editProfileData.availableTo || ''}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-6 py-4 text-lg font-medium text-indigo-200 placeholder-indigo-600 placeholder-opacity-40 focus:outline-none focus:ring-4 focus:ring-indigo-500 shadow-inner transition"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-8 mt-12">
                <button
                    type="submit"
                    className="bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold py-4 px-12 rounded-full shadow-xl transition duration-300"
                >
                  Save
                </button>
                <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-indigo-600 hover:bg-indigo-700 text-indigo-200 font-semibold py-4 px-12 rounded-full shadow-inner transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
        ) : (
            <div className="space-y-7 text-indigo-300 font-sans text-lg leading-relaxed font-medium">
              <p>
                <strong className="font-bold text-indigo-400">Name:</strong> {profile.name}
              </p>
              <p>
                <strong className="font-bold text-indigo-400">Email:</strong> {profile.email}
              </p>
              <p>
                <strong className="font-bold text-indigo-400">Phone:</strong> {profile.phone}
              </p>
              <p>
                <strong className="font-bold text-indigo-400">Specialty:</strong> {profile.specialty}
              </p>
              <p>
                <strong className="font-bold text-indigo-400">Available Days:</strong>{' '}
                {profile.availableDays?.join(', ')}
              </p>
              <p>
                <strong className="font-bold text-indigo-400">Available Time:</strong>{' '}
                {profile.availableFrom} - {profile.availableTo}
              </p>
            </div>
        )}
      </section>
  );
}

export default DoctorProfile;
