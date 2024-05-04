import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ListingsGrid = ({type, email, onListingClick, searchQuery, refreshGrid}) => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchListings(currentPage);
  }, [currentPage, searchQuery, refreshGrid]); // Fetch listings whenever currentPage changes

  const fetchListings = async (page) => {
    try {
      const response = await axios.get(`http://localhost:8000/app/get-listings?page=${currentPage}&email=${email}&type=${type}&searchQuery=${searchQuery}`);
      setListings(response.data.listings);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="ml-60 mr-60 border border-gray-300 rounded-lg">
      {listings.map((listing, index) => (
        <div key={listing.id} onClick={() => onListingClick(listing)} className={`rounded-lg border border-gray-300 mt-4 ml-4 mr-4 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
          }`}>
          <div className="p-4 flex flex-col">
            <div className="mb-2 flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-2">{listing.companyName}</h3>
              <a href={listing.applyLink} target="_blank" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">
                Apply Now
              </a>
            </div>
            <p className="text-gray-600 flex justify-start ">{listing.role}</p>
            <p className="text-gray-600 flex justify-start ">{listing.location}</p>
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div className="flex justify-center mt-4 mb-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 mr-2 rounded ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
        >
          <FaArrowLeft />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 ml-2 rounded ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>

  );
};

export default ListingsGrid;
