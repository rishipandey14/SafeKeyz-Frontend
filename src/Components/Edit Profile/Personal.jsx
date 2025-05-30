import React from 'react';

const Personal = () => {
  return (
    <div className='bg-gray-800 p-6 rounded-2xl shadow border border-base-300'>
      <h2 className='text-2xl font-semibold text-primary mb-4'>Personal Details</h2>
      <form className='space-y-4'>
        <input type="text" placeholder="Country" className='input input-bordered w-full' />
        <input type="text" placeholder="State" className='input input-bordered w-full' />
        <input type="text" placeholder="City" className='input input-bordered w-full' />
        <input type="text" placeholder="Address" className='input input-bordered w-full' />
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default Personal;