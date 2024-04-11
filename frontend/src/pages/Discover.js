import React, { useState } from 'react';
import CreatePostModal from '../components/CreatePostModal';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {FirebaseApp, firebaseConfig} from '../components/FirebaseApp';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import InfiniteScrollComponent from '../components/InfiniteScrollComponent';


const storage = getStorage(FirebaseApp);


const DiscoverPage = ({userId, email}) => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [postFormData, setPostFormData] = useState({
    title: '',
    content: '',
    image: null, 
  });

  const handleCreatePost = () => {
    setPostFormData({
      title: '',
      content: '',
      image: null,
    });
    setShowCreatePostModal(true);
  };
  
  const handleCloseModal = () => {
    setShowCreatePostModal(false);
    setPostFormData({
      title: '',
      content: '',
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPostFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setPostFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  const handlePostSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const uniqueImageId = uuidv4();
  
      const imageRef = ref(storage, `images/${uniqueImageId}`);
      await uploadBytes(imageRef, postFormData.image);
      var imageUrl
      await getDownloadURL(imageRef)
        .then((url) => {
          imageUrl = url;
          console.log("Download URL:", url);
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
      const postData = {
        userId: userId,
        email: email,
        title: postFormData.title,
        description: postFormData.content,
        mediaUrl: imageUrl,
        timestamp: new Date(), 
      };
  
      savePostToMongoDB(postData);
  
      setPostFormData({
        title: '',
        content: '',
        image: null
      });
  

      setShowCreatePostModal(false);
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
    }
  };

  const savePostToMongoDB = async (postData) => {
      try {
          const response = await axios.post('http://127.0.0.1:8000/app/create-post/', postData);
          
          console.log(response.data.message);
      } catch (error) {
          // Handle error
          console.error('Error saving post to MongoDB:', error);
      }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-8 justify-center">
        <button className="bg-purple-700 text-white px-40 py-3 rounded-md hover:bg-purple-800" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>

      <InfiniteScrollComponent email={email}/>

      <CreatePostModal
        show={showCreatePostModal}
        onClose={handleCloseModal}
        onSubmit={handlePostSubmit}
        postFormData={postFormData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default DiscoverPage;
