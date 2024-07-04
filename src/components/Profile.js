import React, { useState } from 'react';
import Navbar from './Navbar';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, you'd send this data to the server here
    console.log('Profile updated:', formData);
    setEditMode(false);
    alert("Profile Updated!");
    // Additional logic for server interaction can be added here
  };

  return (
    <div>
    <Navbar />
    <div className="bg-slat flex justify-center items-center h-screen">
      <div className="max-w-xl w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mr-4 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="ml-4 px-6 py-3 bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-lg mb-4">
              <strong>Name:</strong> {formData.name}
            </p>
            <p className="text-lg mb-4">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-lg mb-4">
              <strong>Phone:</strong> {formData.phone}
            </p>
            <div className="text-center">
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-md"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
