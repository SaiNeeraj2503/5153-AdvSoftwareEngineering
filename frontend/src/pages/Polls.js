import React, { useEffect, useState } from 'react';
import PollDisplay from '../components/PollDisplay';
import CreatePollForm from '../components/CreatePollForm';
import axios from 'axios';

const Polls = ({ userId, email }) => {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleFormClose = () => {
    setShowForm(false);
    setRefresh(!refresh);
  }

  return (
    <div className="flex flex-col items-center"> {/* Added flex container and centered items */}
      <button className="mt-2 text-white border bg-purple-700 hover:bg-purple-800 px-3 py-2 rounded text-sm font-medium" onClick={() => setShowForm(true)}>Create Poll</button>
      <PollDisplay email={email} refresh={refresh}/>
      {showForm && (
        <CreatePollForm closeModal={handleFormClose} userId={userId} email={email} />
      )}
    </div>
  );
};

export default Polls;
