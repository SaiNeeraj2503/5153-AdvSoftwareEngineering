import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 
import {FirebaseApp, firebaseConfig} from '../components/FirebaseApp';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { FaTimes } from 'react-icons/fa';

const storage = getStorage(FirebaseApp);

const CreateProductModal = ({ userId, email, isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    mobileNumber: '', 
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setFormData({ ...formData, images });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const imageUrls = [];
      for (const image of formData.images) {
        const uniqueImageId = uuidv4();
        const imageRef = ref(storage, `images/${uniqueImageId}`);
        await uploadBytes(imageRef, image);
        var imageUrl
        await getDownloadURL(imageRef)
        .then((url) => {
          imageUrl = url;
          console.log("Download URL:", url);
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
        imageUrls.push(imageUrl);
      }
      const productData = {
        userId: userId,
        email: email,
        productName: formData.productName,
        price: formData.price,
        description: formData.description,
        mobileNumber: formData.mobileNumber,
        images: imageUrls,
      };
  
      const response = await axios.post('http://localhost:8000/app/create-product', productData);
      console.log('Product created:', response.data);

      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-4 rounded-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-800 hover:text-gray-800">
            <FaTimes />
          </button>
        <h2 className="text-xl font-bold">Create New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" name="productName" id="productName" value={formData.productName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              name="description" 
              id="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32 overflow-auto resize-none"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input type="text" name="mobileNumber" id="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
            <input type="file" name="images" id="images" onChange={handleImageChange} multiple className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">Create Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
