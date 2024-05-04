import React, { useState } from 'react';
import CreateEventModal from '../components/CreateEventModal';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 
import {FirebaseApp} from '../components/FirebaseApp';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import EventPagination from '../components/EventPagination';

const storage = getStorage(FirebaseApp);


const Events = ({userId, email}) => {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    content: '',
    image: null,
    dueDate: null,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateEvent = () => {
    setEventFormData({
      title: '',
      content: '',
      image: null,
      dueDate: null,
    });
    if (!creatingEvent) {
        setShowCreateEventModal(true);
    }
  };
  
  const handleCloseModal = () => {
    setShowCreateEventModal(false);
    setEventFormData({
      title: '',
      content: '',
      image: null,
      dueDate: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEventFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setEventFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEventSubmit = async (e, dueDate) => {
    e.preventDefault();
    if (creatingEvent) return;
    try {
      setCreatingEvent(true);
      const uniqueImageId = uuidv4();
  
      let imageUrl = null; // Initialize imageUrl with null
      
      // Check if eventFormData.image exists before uploading
      if (eventFormData.image) {
        const imageRef = ref(storage, `images/${uniqueImageId}`);
        await uploadBytes(imageRef, eventFormData.image);
        
        // Retrieve imageUrl only if image upload is successful
        await getDownloadURL(imageRef)
          .then((url) => {
            imageUrl = url;
            console.log("Download URL:", url);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
  
      const eventData = {
        userId: userId,
        email: email,
        title: eventFormData.title,
        description: eventFormData.content,
        mediaUrl: imageUrl,
        timestamp: new Date(), 
        dueDate: dueDate
      };
      
      await saveEventToMongoDB(eventData);
  
      setCreatingEvent(false);
  
      setEventFormData({
        title: '',
        content: '',
        image: null
      });
  
      setShowCreateEventModal(false);
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
      setCreatingEvent(false);
    }
  };
  

  const saveEventToMongoDB = async (eventData) => {
      try {
          const response = await axios.post('http://127.0.0.1:8000/app/create-event/', eventData);

          console.log(response.data.message);
      } catch (error) {
          console.error('Error saving event to MongoDB:', error);
      }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-8 justify-center">
        <button className="bg-purple-700 text-white px-40 py-3 rounded-md hover:bg-purple-800" onClick={handleCreateEvent} disabled={creatingEvent}>
          Create Event
        </button>
      </div>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="block w-40 md:w-1/4 mx-2 mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <EventPagination email={email} query={searchQuery} creating={creatingEvent}/>

      {showCreateEventModal && (
        <CreateEventModal
            onClose={handleCloseModal}
            onSubmit={handleEventSubmit}
            eventFormData={eventFormData}
            handleInputChange={handleInputChange}
        />
        )}

    </div>
  );
};

export default Events;
