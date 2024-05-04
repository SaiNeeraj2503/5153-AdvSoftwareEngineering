import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import CreateProductModal from '../components/CreateProductModal';
import Footer from '../components/Footer';

const MarketplacePage = ({userId, email}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshProductGrid, setRefreshProductGrid] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProductCreated = () => {
    // Set refreshProductGrid to true to trigger re-render of ProductGrid
    setRefreshProductGrid(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
    <div className="flex flex-col items-center justify-center flex-grow">
        <div className="header text-center">
          <h1 className="text-3xl font-bold my-4">Featured</h1>
          <p className="text-sm">Explore the wide range of products</p>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="block w-64 px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <button
        onClick={handleCreateModalOpen}
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded mt-4 mb-8"
        >
        Create New Product
        </button>
        <ProductGrid
          email={email}
          onProductClick={handleProductClick}
          searchQuery={searchQuery} // Pass search query to ProductGrid
          refreshProductGrid={refreshProductGrid} // Pass refreshProductGrid as prop
          setRefreshProductGrid={setRefreshProductGrid}
        />
        <ProductModal product={selectedProduct} onCloseModal={handleCloseModal} />
        <CreateProductModal userId={userId} email={email} isOpen={isCreateModalOpen} onClose={handleCreateModalClose} onProductCreated={handleProductCreated} />
    </div>
    <Footer className="self-end" />
    </div>
  );
};

export default MarketplacePage;
