import React from 'react';

const General = () => {
  return (
    <div className='bg-base-200 p-6 rounded-2xl shadow border border-base-300'>
      <h2 className='text-2xl font-semibold text-primary mb-4'>General Information</h2>
      <form className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <img src="/assets/user-avatar.png" className='w-20 h-20 rounded-full' alt="User Avatar" />
          <input type='file' className='file-input file-input-sm file-input-bordered w-full max-w-xs' />
        </div>
        <input type="text" placeholder="First Name" className='input input-bordered w-full' />
        <input type="text" placeholder="Last Name" className='input input-bordered w-full' />
        <input type="date" className='input input-bordered w-full' />
        <select className='select select-bordered w-full'>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default General;
