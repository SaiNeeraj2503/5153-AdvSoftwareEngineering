import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaChevronUp } from 'react-icons/fa';
import EventCard from './EventCard';

const EventPagination = ({ email, query, creating }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(query);

  const fetchEvents = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/app/get-events?page=${page}&email=${email}&searchQuery=${searchQuery}`);
      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage, email, searchQuery, creating]);

  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery(query);
  }, [query]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <EventCard
            username={event.username}
            imageUrl={event.mediaUrl}
            title={event.title}
            description={event.description}
            timestamp={event.timestamp}
            dueDate={event.dueDate}
          />
        </div>
      ))}
      {loading && <p className="text-center">Loading...</p>}
      <div className="flex justify-center mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 mr-2 rounded">
          <FaChevronLeft />
        </button>
        <span className="mx-4 text-gray-600">Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 mr-2 rounded">
          <FaChevronRight />
        </button>
      </div>
      <div className="fixed bottom-4 right-4">
        <button onClick={scrollToTop} className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
          <FaChevronUp />
        </button>
      </div>
    </div>
  );
};

export default EventPagination;
