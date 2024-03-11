import React from 'react';
import moment from 'moment';

const Post = ({ username, timestamp, imageUrl, title, description }) => {
  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const now = moment();
    const postTime = moment(timestamp);
    const diffHours = now.diff(postTime, 'hours');

    if (diffHours < 24) {
      return moment(timestamp).fromNow();
    } else {
      return moment(timestamp).format('MMM D, YYYY');
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{username}</h3>
          <p className="text-sm text-gray-500">{formatTimestamp(timestamp)}</p>
        </div>
        <img src={imageUrl} alt="Post" className="w-full rounded-lg mb-2" />
        <div>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
