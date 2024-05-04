import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

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

const PollCard = ({ poll, email }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState([]);

  const fetchVotes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/app/get-votes?pollId=${poll.id}&email=${email}`);
      setVotes(response.data.votes);
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [poll.id]);

  const handleVote = async () => {
    try {
      if (selectedOption !== null) {
        const response = await axios.post('http://127.0.0.1:8000/app/add-vote', {
          pollId: poll.id,
          selectedOptionIndex: selectedOption,
          email: email,
        });
        // Handle successful vote response
        // After voting, update the votes
        fetchVotes();
      } else {
        // Handle case when no option is selected
        console.error('Please select an option before voting.');
      }
    } catch (error) {
      console.error('Error voting:', error);
      // Handle error
    }
  };

  // Get the vote count for each option
  const getVoteCount = (optionIndex) => {
    // Return the count of votes for the current option
    return votes[optionIndex] || 0; // Return 0 if votes[optionIndex] is undefined (no votes for that option)
  };

  // Get total votes for the poll
  const getTotalVotes = () => {
    let count = 0;
    for (let i = 0; i < poll.options.length; i++) {
      count += getVoteCount(i);
    }
    return count;
  };

  return (
    <div className="border rounded-lg p-4 mb-4 relative">
      <p className="text-gray-500 mb-2 absolute top-0 right-0 mr-2">{formatTimestamp(poll.timestamp)}</p>
      <p className="text-sm font-normal mb-2 absolute top-0 left-0 p-2">{poll.username}</p>
      <h3 className="text-lg font-semibold mb-2 mt-4">{poll.question}</h3>
      <ul>
        {poll.options.map((option, index) => (
          <li key={index} className="flex items-center justify-between">
            <div>
              <input
                type="radio"
                name="pollOption"
                id={`option${index}`}
                className="mr-2"
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
            {getVoteCount(index) > 0 && (
              <span className="text-green-600">{getVoteCount(index)}</span>
            )}
          </li>
        ))}
      </ul>
      {getTotalVotes() > 0 && (
        <p className="text-gray-500 absolute bottom-0 right-0 mr-2">Total Votes: {getTotalVotes()}</p>
      )}
      <button onClick={handleVote} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
        Vote
      </button>
    </div>
  );
};

export default PollCard;
