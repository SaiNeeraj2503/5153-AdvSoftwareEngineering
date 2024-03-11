import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({onLogin}) => {

  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/app/login/', {
        email: formData.email,
        password: formData.password,
      });
      console.log('Login response:', response.data);
      onLogin(response.data.userId, response.data.email);
      navigate('/discover');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while logging in. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800">Log In</button>
        </form>
      </div>
      <div>
        <p>Don't have an account? <Link to="/signup" className="text-purple-700 font-medium">Sign Up</Link></p>
      </div>
      {errorMessage && (
        <div className="max-w-md w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      )}
    </div>
  );
  
};

export default LoginForm;
