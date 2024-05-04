import React from 'react';

const CreatePostModal = ({ show, onClose, onSubmit, postFormData, handleInputChange }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
        <form onSubmit={onSubmit} className="flex flex-col" encType="multipart/form-data">
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={postFormData.title}
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            placeholder="Post Content"
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none"
            rows="4"
            value={postFormData.content}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="file"
            name="image"
            accept="image/*" 
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            onChange={handleInputChange}
          />
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

export default CreatePostModal;
