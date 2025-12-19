import React from 'react';

const Personal = () => {
  return (
    <div className='bg-white p-6 rounded-2xl shadow border border-gray-200'>
      <h2 className='text-2xl font-semibold text-green-600 mb-4'>Personal Details</h2>
      <form className='space-y-4'>
        <input type="text" placeholder="Country" className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500' />
        <input type="text" placeholder="State" className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500' />
        <input type="text" placeholder="City" className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500' />
        <input type="text" placeholder="Address" className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500' />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">Save Changes</button>
      </form>
    </div>
  );
};

export default Personal;