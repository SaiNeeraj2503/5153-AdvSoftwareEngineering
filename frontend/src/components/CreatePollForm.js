import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const CreatePollForm = ({ closeModal, userId, email }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); // Initial four empty options

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 4) { // Limit options to 4
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) { // Ensure at least two options
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if question or any option is empty
    if (!question.trim() || options.some(option => !option.trim())) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/app/create-poll/', {
        question,
        options,
        userId,
        email
      });

      closeModal(); // Close modal after poll creation
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white border rounded-lg p-8 relative">
        <span className="absolute p-2 top-0 right-0 cursor-pointer text-gray-500" onClick={closeModal}>
          <FaTimes />
        </span>
        <h2 className="text-xl font-bold mb-4">Create Poll</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-center">
            <label className="mb-4">
              Question:
              <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:border-blue-400" />
            </label>
            {options.map((option, index) => (
              <div key={index} className="mb-4 flex items-center"> {/* Added flex container */}
                <label>
                  Option {index + 1}:
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:border-blue-400"
                  />
                </label>
                {index > 1 && (
                  <span className="ml-2 text-red-600 hover:text-red-800 cursor-pointer" onClick={() => removeOption(index)}>
                    <FaTimes />
                  </span>
                )}
              </div>
            ))}
            {options.length < 4 && (
              <button type="button" onClick={addOption} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add Option
              </button>
            )}
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4">
              Create Poll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePollForm;
