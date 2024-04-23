import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseApp } from '../components/FirebaseApp';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

const storage = getStorage(FirebaseApp);

const CreateGroupModal = ({userId, email, isOpen, onClose, updateGroups }) => {
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupImage, setGroupImage] = useState('');
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [creatingGroup, setCreatingGroup] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.post('http://localhost:8000/app/get-users', { email: email, userId: userId}); 
      setAllUsers(response.data.users); 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupDescriptionChange = (e) => {
    setGroupDescription(e.target.value);
  };

  const handleGroupImageChange = (e) => {
    if (e.target.files[0]) {
      setGroupImage(e.target.files[0]); // Set image file
    }
  };

  const handleUserCheckboxChange = (userId) => {
    if (usersToAdd.includes(userId)) {
      setUsersToAdd(prevUsers => prevUsers.filter(id => id !== userId));
    } else {
      setUsersToAdd(prevUsers => [...prevUsers, userId]);
    }
  };
  

  const handleSubmitFirstStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitSecondStep = async () => {
    if (creatingGroup) return; 
    try {
      setCreatingGroup(true);
      
      const uniqueImageId = uuidv4();
      const imageRef = ref(storage, `images/${uniqueImageId}`);
      await uploadBytes(imageRef, groupImage);
      const imageUrl = await getDownloadURL(imageRef);

      const groupData = {
        user_id: userId,
        email: email,
        groupName: groupName,
        groupDescription: groupDescription,
        groupImage: imageUrl,
        users: usersToAdd,
      };

      const response = await axios.post('http://localhost:8000/app/create-group', groupData);
      console.log('Group Data:', groupData);
      updateGroups();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setCreatingGroup(false);
    }
  };

  const handleCloseModal = () => {
    setGroupName('');
    setGroupDescription('');
    setGroupImage(null);
    setUsersToAdd([]);
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {step === 1 ? (
          <>
            <h2 className="text-lg font-bold mb-4">Step 1: Group Details</h2>
            <form onSubmit={handleSubmitFirstStep}>
              <div className="mb-4">
                <label htmlFor="groupName" className="block text-sm font-bold mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={handleGroupNameChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="groupDescription" className="block text-sm font-bold mb-2">
                  Group Description
                </label>
                <textarea
                  id="groupDescription"
                  value={groupDescription}
                  onChange={handleGroupDescriptionChange}
                  className="border border-gray-300 rounded-md p-2 w-full h-20 resize-none overflow-auto"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="groupImage" className="block text-sm font-bold mb-2">
                  Group Image URL
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="groupImage"
                  onChange={handleGroupImageChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4">Step 2: Select Users</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="usersToAdd" className="block text-sm font-bold mb-2">
                  Users to Add
                </label>
                {allUsers
                  .filter(user => user.user_id !== userId)
                  .map(user => (
                    <div key={user.user_id} className="flex items-center justify-between">
                      <label htmlFor={`checkbox-${user.user_id}`} className="ml-2">{user.username}</label>
                      <input
                        type="checkbox"
                        id={`checkbox-${user.user_id}`}
                        checked={usersToAdd.includes(user.user_id)}
                        onChange={() => handleUserCheckboxChange(user.user_id)}
                        className="mr-2"
                      />
                    </div>
                  ))}

              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleSubmitSecondStep}
                  className="ml-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateGroupModal;
