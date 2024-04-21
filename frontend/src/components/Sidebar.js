import React from 'react';
import { FaPlus, FaBell, FaCog } from 'react-icons/fa';

const Sidebar = ({ groups, onCreateGroup, onNotificationsClick, onSettingsClick, onGroupClick }) => {
  const handleGroupClick = (group) => {
    onGroupClick(group);
  };

  return (
    <div className="bg-gray-100 h-4/5 md:h-screen w-1/4 border-r border-gray-300 p-4 flex flex-col overflow-hidden">
      <h2 className="text-lg font-bold mb-4">Joined Groups</h2>
      <div className="overflow-y-auto flex-grow border-b border-gray-300">
        {groups.map((group, index) => (
          <div
            key={group.id}
            className={`cursor-pointer flex items-center py-2 ${
              index !== groups.length - 1 ? 'border-b border-gray-300' : ''
            }`}
            onClick={() => handleGroupClick(group)} // Add onClick handler
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                <img src={group.image} alt="Group Image" className="w-full h-full object-cover" />
              </div>
              <span className="text-gray-700 font-semibold text-lg ml-auto">{group.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start mt-4">
        <button onClick={onCreateGroup} className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded mb-2">
          <FaPlus className="inline mr-2" />
          Create Group
        </button>
        <button onClick={onNotificationsClick} className="text-gray-600 hover:text-gray-800 flex items-center mb-2">
          <FaBell className="mr-2" />
          Notifications
        </button>
        <button onClick={onSettingsClick} className="text-gray-600 hover:text-gray-800 flex items-center mb-2">
          <FaCog className="mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
