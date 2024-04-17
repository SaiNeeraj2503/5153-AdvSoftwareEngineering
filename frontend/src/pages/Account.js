import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateAccountModal from '../components/UpdateAccountModal';
import moment from 'moment';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AccountPage = ({ userId, email }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUserActivity();
  }, [currentPage]); // Fetch activity when currentPage changes

  const fetchUserActivity = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/app/user-activity`, {
        params: {
          page: currentPage,
          email: email,
          userId: userId
        }
      });

      setUserActivity(response.data.activities);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching user activity:', error);
    }
    setLoading(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col mt-4 items-center justify-center">
  <button
    onClick={() => setShowUpdateModal(true)}
    className="bg-purple-700 text-white font-semibold py-2 px-4 rounded hover:bg-purple-800 mb-4"
  >
    Update Account Details
  </button>
  {showUpdateModal && (
    <UpdateAccountModal
      userId={userId}
      onCloseModal={() => setShowUpdateModal(false)}
    />
  )}
  <div className="text-center w-full max-w-4xl mx-auto">
    <h1>User Activity Feed</h1>
    <div
      className="w-full overflow-y-auto"
      style={{ maxHeight: '70vh', overflowX: 'hidden' }}
    >
      {userActivity.map((activity, index) => (
        <div
          key={index}
          className={`items-center border p-4 my-4 relative ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
          } mx-auto mr-8 w-4/5 sm:w-full`}
        >
          <p className="mb-2 text-left">{activity.description}</p>
          <p className="text-xs text-gray-600 absolute mr-1 mb-1 top-0 right-0">
            {moment(activity.created_at).fromNow()}
          </p>
        </div>
      ))}
    </div>

    <div className="flex justify-between mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 mr-2 rounded"
      >
        <FaChevronLeft />
      </button>
      <div>
        {currentPage} / {totalPages}
      </div>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 mr-2 rounded"
      >
        <FaChevronRight />
      </button>
    </div>
    {loading && <div>Loading...</div>}
    {!loading && !totalPages && <div>No activities found</div>}
  </div>
</div>

  );
};

export default AccountPage;
