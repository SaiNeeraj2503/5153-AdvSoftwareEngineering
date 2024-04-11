// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 px-4">
        <div className="max-w-7xl mx-auto border-t border-gray-300 pt-6 flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Company Name</h3>
            <p className="font-bold text-gray-600">Address:</p>
            <p className="text-gray-600">Address Line 1</p>
            <p className="font-bold text-gray-600">Contact Us:</p>
            <p className="text-gray-600">contact@example.com</p>
            </div>
            <div className="flex justify-center lg:justify-start space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Terms and Conditions</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Cookie Settings</a>
            </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-300 mt-6 pt-6 text-gray-600 text-center">
        All rights reserved © 2024 Company Name
        </div>
    </footer>
  );
};

export default Footer;
