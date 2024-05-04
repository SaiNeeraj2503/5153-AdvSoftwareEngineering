import React from 'react';
import { Link } from 'react-router-dom';
const logoImagePath = process.env.PUBLIC_URL + '/images/logo.jpg';
const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
          
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img src={logoImagePath} alt="MSU Campus Connect" className="h-8 w-auto" />
            </Link>
          </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/discover" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Discover
              </Link>
              <Link to="/groups" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Groups
              </Link>
              <Link to="/marketplace" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Marketplace
              </Link>
              <Link to="/postings" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Postings
              </Link>
              <Link to="/events" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Events
              </Link>
              <Link to="/polls" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Polls
              </Link>
            </div>
          </div>
          <div className="flex items-center md:ml-6">
            {isAuthenticated ? (
              <>
                <button className="text-black border border-black hover:bg-gray-200 px-3 py-2 rounded text-sm font-medium mr-2">
                  <Link to="/account">Account</Link>
                </button>
                <button onClick={onLogout} className="text-white  bg-purple-700 hover:bg-purple-800 px-3 py-2 rounded text-sm font-medium">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button className="text-black border border-black hover:bg-gray-200 px-3 py-2 rounded text-sm font-medium mr-2">
                  <Link to="/signup">Sign Up</Link>
                </button>
                <button className="text-white border  bg-purple-700 hover:bg-purple-800 px-3 py-2 rounded text-sm font-medium">
                  <Link to="/login">Log In</Link>
                </button>

              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
