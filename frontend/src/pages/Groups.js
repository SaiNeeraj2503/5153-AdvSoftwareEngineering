import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import CreateGroupModal from '../components/CreateGroupModal';
import GroupDetails from '../components/GroupDetails';
import axios from 'axios';

const Groups = ({userId, email}) => {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/app/get-groups?email=${email}&userId=${userId}`);
        setGroups(response.data.groups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, [email, updateTrigger]);

  const handleCreateGroup = () => {
    setIsCreateGroupModalOpen(true);
  };

  const handleCloseCreateGroupModal = () => {
    setIsCreateGroupModalOpen(false);
  };
  
  const handleNotificationsClick = () => {
    console.log('Notifications clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const onGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const updateGroups = () => {
    console.log('Triggering update')
    setUpdateTrigger(!updateTrigger);
  }

  return (
    <div className="flex">
      <Sidebar
        groups={groups}
        onCreateGroup={handleCreateGroup}
        onNotificationsClick={handleNotificationsClick}
        onSettingsClick={handleSettingsClick}
        onGroupClick={onGroupClick}
      />

      {selectedGroup ? (
        <GroupDetails group={selectedGroup} email={email} />
      ) : (
        <div className="w-3/5 p-4 border border-gray-300 rounded-lg mt-4 ml-4 mb-4 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-normal mb-2">Select or create a group</h1>
        </div>
      )}

      <CreateGroupModal userId={userId} email={email} isOpen={isCreateGroupModalOpen } onClose={handleCloseCreateGroupModal} updateGroups={updateGroups}/>
    </div>
  );
};

export default Groups;
