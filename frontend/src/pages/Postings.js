import React, { useState } from 'react';
import ListingsGrid from '../components/ListingGrid';
import CreateListingModal from '../components/CreateListingModal';
import Footer from '../components/Footer';
import ListingModal from '../components/ListingModal';

const Postings = ({ userId, email }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
  };

  const handleCreateListing = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="header text-center">
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCreateListing}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
            >
              Create New Listing
            </button>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Jobs</h2>
            <ListingsGrid type="job" email={email} onListingClick={handleListingClick} />
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Internships</h2>
            <ListingsGrid type="internship" email={email} onListingClick={handleListingClick} />
          </section>
        </div>
      </div>
      <Footer />
      {isModalOpen && <CreateListingModal userId={userId} email={email} onCloseModal={handleCloseModal} />}
      {selectedListing && <ListingModal listing={selectedListing} onCloseModal={() => setSelectedListing(null)} />}
    </div>
  );
};

export default Postings;
