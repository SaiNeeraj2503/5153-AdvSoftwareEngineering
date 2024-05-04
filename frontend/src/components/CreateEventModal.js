import React, { useRef, useState } from 'react';
import DueDateModal from './DueDateModal';

const CreateEventModal = ({ onClose, onSubmit, eventFormData, handleInputChange }) => {
  
  const [showDueDateModal, setShowDueDateModal] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const buttonRef = useRef(null);

  const openDueDateModal = () => {
    setShowDueDateModal(true);
  };

  const closeDueDateModal = () => {
    setShowDueDateModal(false);
  };

  const handleDueDateSave = (dueDate) => {
    setDueDate(dueDate);
    console.log('Due Date:', dueDate)
    closeDueDateModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit(e, dueDate);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="flex flex-col" encType="multipart/form-data">
          
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={eventFormData.title}
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            placeholder="Event Content"
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none"
            rows="4"
            value={eventFormData.content}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="file"
            name="image"
            accept="image/*" 
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            onChange={handleInputChange}
          />
          <div className="mb-4">
            <button type="button" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md mr-2" onClick={openDueDateModal} ref={buttonRef}>
              Select Event Date
            </button>
          </div>
          {showDueDateModal && (
                <DueDateModal
                onCancel={closeDueDateModal}
                onSave={handleDueDateSave}
                buttonRef={buttonRef}
              />
          )}
          <div className="flex justify-end">
            <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800">
              Submit
            </button>
            <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
