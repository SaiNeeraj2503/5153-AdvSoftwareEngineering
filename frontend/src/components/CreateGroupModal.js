import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const CreateListingModal = ({userId, email, onCloseModal, onGridRefresh }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    requirements: '',
    description: '',
    applyLink: '',
    applyEmail: '',
    salary: '',
    location: '',
    expectedJoiningDate: null,
    userEmail: email,
    userId: userId,
    listingType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      expectedJoiningDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/app/create-listing', formData);
      console.log('Form submitted successfully:', response.data);
      
      // Close the modal
      onCloseModal();

      onGridRefresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle errors, such as displaying an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full h-4/5 md:max-w-lg overflow-auto">
        <h2 className="text-lg font-bold mb-4">Create New Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
            <div className="flex">
              <label className="flex items-center mr-4">
                <input
                  type="radio"
                  name="listingType"
                  value="job"
                  checked={formData.listingType === 'job'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Job
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="listingType"
                  value="internship"
                  checked={formData.listingType === 'internship'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Internship
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full h-20 overflow-auto resize-none"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full h-20 overflow-auto resize-none"
              required
            ></textarea>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="expectedJoiningDate" className="block text-sm font-medium text-gray-700">Expected Joining Date</label>
            <div className="w-full">
              <DatePicker
                placeholderText="MM/DD/YYYY"
                id="expectedJoiningDate"
                name="expectedJoiningDate"
                selected={formData.expectedJoiningDate}
                onChange={handleDateChange}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="applyLink" className="block text-sm font-medium text-gray-700">Apply Link</label>
            <input type="url" id="applyLink" name="applyLink" value={formData.applyLink} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="applyEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input type="applyEmail" id="applyEmail" name="applyEmail" value={formData.applyEmail} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Expected Salary</label>
            <input 
              type="number" 
              id="salary" 
              name="salary" 
              value={formData.salary} 
              onChange={handleChange} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
              required 
              step="1000" 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="flex justify-end mt-6">
            <button type="button" onClick={onCloseModal} className="mr-2 ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-purple-700 text-white rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingModal;
