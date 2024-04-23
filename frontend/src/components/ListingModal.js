import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ListingModal = ({ listing, onCloseModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg w-4/5 h-4/5 overflow-y-auto shadow-lg">
        <button onClick={onCloseModal} className="absolute top-0 right-0 m-4 text-gray-800 hover:text-gray-800">
          <FaTimes />
        </button>
        <div className="flex justify-between mt-2 items-center mb-2">
        <h2 className="text-2xl font-bold">{listing.companyName} <span className="text-xl font-normal">({listing.role})</span></h2>
          <a href={listing.applyLink} className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">
            Apply Now
          </a>
        </div>
        <div>
        <p className="text-gray-700 mb-4">{listing.location}</p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-300 pt-4 text-justify">
          <div> 
            <p className="text-gray-700 mb-4"><span className="font-bold">Description</span><br /> {listing.description}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Requirements</span><br /> {listing.requirements}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Salary:</span> ${listing.salary}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Contact Email:</span><br /> {listing.email}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Expected Joining Date:</span> {new Date(listing.expectedJoiningDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingModal;
