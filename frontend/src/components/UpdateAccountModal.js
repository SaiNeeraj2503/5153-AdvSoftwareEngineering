import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const UpdateAccountModal = ({ userId, onCloseModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password must match');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8000/app/update-user`, {
        userId: userId,
        username: username,
        email: email,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      setSuccessMessage(response.data.message);
      onCloseModal();
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.error); // Set error message if current password is incorrect
      } else {
        setErrorMessage('An error occurred while updating user details');
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="relative bg-white p-8 rounded-lg w-4/5 h-4/5 overflow-y-auto shadow-lg">
        <button onClick={onCloseModal} className="absolute top-0 right-0 m-4 text-gray-800 hover:text-gray-800">
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">Update Account Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
          </div>
          {/* Email field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
          </div>
          {/* Current password field */}
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" id="currentPassword" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
          </div>
          {/* New password field */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
          </div>
          {/* Confirm password field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
          </div>
          {/* Error message for incorrect current password */}
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          {/* Success message */}
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
          {/* Submit button */}
          <button type="submit" className="bg-violet-600 text-white font-semibold py-2 px-4 rounded hover:bg-violet-700">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountModal;
