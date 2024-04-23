import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

const ProductModal = ({ product, onCloseModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  if (!product) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-3/4 h-4/5 overflow-y-auto">
        <div className="relative flex items-center justify-center rounded-lg overflow-hidden h-full" style={{ height: '80%'}}>
          <button onClick={onCloseModal} className="absolute top-0 right-0 text-gray-800 hover:text-gray-800">
            <FaTimes />
          </button>
          <img src={product.images[currentImageIndex]} alt={product.name} className="max-h-full max-w-full object-cover mt-8" />
          {product.images.length > 1 && (
            <>
              <button onClick={handlePrevImage} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-2">
                <FaArrowLeft className="text-gray-600" />
              </button>
              <button onClick={handleNextImage} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-2">
                <FaArrowRight className="text-gray-600" />
              </button>
            </>
          )}
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold text-blue-800 mt-2 mb-4">{product.productName}</h2>
          <p className="text-lg text-gray-600 mb-2">
          <span className="inline-block bg-green-200 text-green-800 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2">Price</span>
            ${product.price}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <span className="inline-block bg-violet-200 text-violet-800 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2">About</span>
            {product.description}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <span className="inline-block bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2">Contact</span>
            {product.mobileNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
