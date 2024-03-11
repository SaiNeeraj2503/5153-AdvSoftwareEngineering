import React from 'react';
import FAQs from './FAQs';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="max-w-screen-xl mt-5 mx-auto px-4">
        <div className="h-96 bg-cover bg-center flex  items-center shadow  p-6 mb-8" style={{backgroundImage: `url('/images/grey_image.jpg')`}}>
            <div className="text-left ml-10">
                <h2 className="text-4xl font-semibold text-gray-700">Discover a campus of</h2>
                <h2 className="text-4xl font-semibold mb-4 text-gray-700">endless possibilities</h2>
                <p className="text-sm text-gray-700 mb-4">Welcome to our platform, where you can connect, explore, and thrive.</p>
                <div className="flex space-x-4 ">
                    <button className="bg-purple-700 text-white py-2 px-4  hover:bg-purple-800">Get Started</button>
                    <button className="bg-gray-200 text-gray-800 py-2 px-4  hover:bg-gray-300">Learn More</button>
                </div>
            </div>
        </div>

        <div className="bg-white mt-40 mb-8">
            <h2 className="text-2xl font-semibold">Explore the Key Features of</h2>
            <h2 className="text-2xl font-semibold mb-4">Our Platform</h2>
            <p className="text-gray-700 mb-4">Navigate seamlessly to the feed, marketplace, posting, groups, and more.</p>
            <div className="flex space-x-4">
                <button className="bg-purple-700 text-white py-2 px-4  hover:bg-purple-800">Learn More</button>
                <button className="text-gray-800 py-2 px-4  hover:bg-gray-300">Sign Up</button>
            </div>
        </div>

        <div className="flex bg-white rounded-lg mt-40 mb-8">
            <div className="flex-shrink-0">
                <h2 className="text-2xl font-semibold text-gray-700 mr-4">Discover and connect with us</h2>
                <p className="text-gray-700">Join our community and unlock exclusive benefits</p>
            </div>
            <div className="flex-grow"></div>
            <div className="flex items-center">
                <button className="bg-purple-700 text-white py-2 px-4  hover:bg-purple-800 mr-2">Sign Up</button>
                <button className="text-gray-800 py-2 px-4 border-black border  hover:bg-gray-300">Log In</button>
            </div>
        </div>

        {/* Team */}

        <div className="flex bg-white mt-40 mb-8">
            <div className="flex-shrink-0">
                <h2 className="text-2xl font-semibold text-gray-700 mr-4">Meet Our Team</h2>
                <p className="text-gray-700">Learn about the awesome individuals behind our platform</p>
            </div>
            <div className="flex-grow"></div>
            <div className="flex items-center"></div>
        </div>

        <div className="flex bg-white  justify-center mt-5 mb-8">
            <div className="flex justify-center">
            <div className="flex flex-col items-center mr-8 border border-gray-300 px-10 py-16 rounded-lg" style={{ width: '280px' }}>
                <img className="w-20 h-20 rounded-full mb-2" src="/images/team_member_1.jpg" alt="Team member 1" />
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-sm text-gray-700">Position</p>
                {/* social links here */}
            </div>

            <div className="flex flex-col items-center mr-8 border border-gray-300 px-10 py-16 rounded-lg" style={{ width: '280px' }}>
                <img className="w-20 h-20 rounded-full mb-2" src="/images/team_member_2.jpg" alt="Team member 2" />
                <h3 className="text-lg font-semibold">Jane Smith</h3>
                <p className="text-sm text-gray-700">Position</p>
                {/* social links here */}
            </div>

            <div className="flex flex-col items-center mr-8 border border-gray-300 px-10 py-16 rounded-lg" style={{ width: '280px' }}>
                <img className="w-20 h-20 rounded-full mb-2" src="/images/team_member_3.jpg" alt="Team member 3" />
                <h3 className="text-lg font-semibold">Alex Johnson</h3>
                <p className="text-sm text-gray-700">Position</p>
                {/* social links here */}
            </div>
        </div>

        </div>


        <div className="max-w-xl mx-auto px-4 mt-40 mb-20">
            <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                <p className="text-sm text-gray-500">- John Doe, Student</p>
            </div>
        </div>


        <div className="flex flex-col bg-white shadow rounded-lg p-6 mb-4">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Stay Updated with Our Newsletter</h2>
                <p className="text-gray-700">Subscribe to our newsletter for the latest updates and news.</p>
            </div>
            <div className="flex items-center">
                <input type="email" placeholder="Enter your email" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none" />
                <button className="bg-purple-700 text-white ml-4 py-2 px-4 hover:bg-purple-800">Subscribe</button>
            </div>
        </div>


        <div className="flex flex-col items-center justify-center h-screen">
          <div className="max-w-7xl w-full">
            <FAQs />
          </div>
          <div className="text-center mb-4">
            <p className="text-gray-700">Still have questions?</p>
          </div>
          <div className="flex justify-center">
            <button className="bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800">Contact Us</button>
          </div>
        </div>


        <Footer />




    {/* Add other cards here */}

    </div>

  );
};

export default Home;
