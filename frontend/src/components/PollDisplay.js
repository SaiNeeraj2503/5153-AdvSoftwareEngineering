import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PollCard from './PollCard';

const PollDisplay = ({ email, refresh }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/app/get-polls?email=${email}&page=${page}`);
        setPolls(response.data.polls);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPolls();
  }, [email, page, refresh]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-1/2 mt-4 mx-auto">
      <h2 className="mr-64 mb-4 p-1 rounded text-xl font-semibold border border-transparent hover:border-gray-200">Polls</h2>
      {polls.map((poll) => (
        <div key={poll.id}>
          <PollCard poll={poll} email={email}/>
        </div>
      ))}
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline">
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PollDisplay;
