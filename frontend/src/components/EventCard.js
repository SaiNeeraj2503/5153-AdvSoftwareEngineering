import React, { useState } from 'react';
import moment from 'moment';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; 

const EventCard = ({ username, timestamp, imageUrl, title, description, dueDate }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatTimestamp = (timestamp) => {
    const now = moment();
    const eventTime = moment(timestamp);
    const diffHours = now.diff(eventTime, 'hours');

    if (diffHours < 24) {
      return moment(timestamp).fromNow();
    } else {
      return moment(timestamp).format('MMM D, YYYY');
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  console.log("imageUrl:", imageUrl);

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{username}</h3>
          <p className="text-sm text-gray-500">{formatTimestamp(timestamp)}</p>
        </div>
        {imageUrl && ( 
          <img src={imageUrl} alt="Event" className="w-full rounded-lg mb-2" />
        )}
        <p className="text-red-500">Event Date: {moment(dueDate).format('MMM D, YYYY')}</p>
        <div>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          {showFullDescription ? (
            <>
              <p className="text-gray-700">{description}</p>
              <div className="flex justify-end mt-2"> 
                <button onClick={toggleDescription} className="text-blue-500 text-sm">
                  <FaAngleUp /> 
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700">{description.slice(0, 100)}</p>
              <div className="flex justify-end mt-2"> 
                <button onClick={toggleDescription} className="text-blue-500 text-sm">
                  <FaAngleDown /> 
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
