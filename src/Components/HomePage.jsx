import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='bg-gray-950 text-white min-h-screen px-6 py-12 flex flex-col items-center'>
      {/* Hero Section */}
      <div className='max-w-5xl text-center space-y-8 mt-12'>
        <h1 className='text-5xl pb-4 md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent'>Welcome to SafeKeyz 🔐</h1>
        <p className='text-lg md:text-xl text-gray-300'>
          Your personal secure vault for all your online credentials — emails, social accounts, shopping platforms, and more.
        </p>
        <div className='flex flex-col md:flex-row items-center justify-center gap-4 mt-6'>
          <Link 
            to="/login"
            state={{isLoginForm : false}}
            className='bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition'
          >
            Get Started
          </Link>
          <Link to="/login" state={{isLoginForm : true}} className='text-purple-400 hover:underline'>Already have an account?</Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage;