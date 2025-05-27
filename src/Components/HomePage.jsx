import React from 'react';
import Banner from './Banner';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex-grow">
      <Banner />

      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Take control of your digital security<br />with our password manager</h1>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Collaboration is made easy with our cloud storage platform. You can easily share files with friends,
            family, or colleagues, and even work on them together in real-time.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login" state={{isLoginForm : false}} className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-md font-medium">Try SafeKeyz Now</Link>
            <Link to="/learn-more" className="border border-gray-500 hover:border-white hover:text-white text-gray-300 px-6 py-3 rounded-md font-medium">Learn more →</Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-gray-900 rounded-lg text-center">
            <p className="text-3xl font-bold">350 K</p>
            <p className="text-gray-400">Many people use SafeKeyz for secure their password.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg text-center">
            <p className="text-3xl font-bold">98%</p>
            <p className="text-gray-400">SafeKeyz users were saved during various fraud attempts.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="text-green-400 font-medium mb-2">accounts.spotify.com</p>
            <p className="mb-2">Strong Password</p>
            <div className="h-2 bg-green-600 rounded-full w-full"></div>
            <p className="text-xs text-gray-400 mt-2">
              Your password is one of the most important lines of defense against online threats.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="font-medium mb-2">Devices</p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>📱 iPhone 8 - Aug 28 at 1:21 PM</li>
              <li>📱 iPhone SE - Aug 27 at 3:55 PM</li>
              <li>🖥 iMac - Aug 24 at 10:31 AM</li>
              <li>🖥 Mac Studio - Aug 14 at 11:49 PM</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;