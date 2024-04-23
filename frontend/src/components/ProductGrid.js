import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

const ProductGrid = ({ email, onProductClick, searchQuery, refreshProductGrid, setRefreshProductGrid}) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/app/get-products?page=${currentPage}&email=${email}&searchQuery=${searchQuery}`);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); 
  }, [currentPage, email, searchQuery, refreshProductGrid]);

  useEffect(() => {
    // After updating products, reset refreshProductGrid to false
    setRefreshProductGrid(false);
  }, [products, setRefreshProductGrid]);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onProductClick(product)}
          className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
          style={{
            width: "400px",
            height: "350px",
            maxWidth: "100%", 
            maxHeight: "100%",
          }}
        >
          <div
            className="relative overflow-hidden rounded-lg"
            style={{ paddingBottom: "56%" }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black opacity-25"></div>
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-lg">{product.productName}</h3>
            <p className="text-gray-600">{"$" + product.price}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={handlePrevPage}
        className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 mr-2 rounded"
      >
        <FaArrowLeft />
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 ml-2 rounded"
      >
        <FaArrowRight />
      </button>
    </div>
  </div>

  );
};

export default ProductGrid;
