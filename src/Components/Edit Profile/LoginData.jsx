import React from 'react';

const LoginData = () => {
  return (
    <div className='bg-base-200 p-6 rounded-2xl shadow border border-base-300'>
      <h2 className='text-2xl font-semibold text-primary mb-4'>Login Details</h2>
      <form className='space-y-4'>
        <input type="password" placeholder="Current Password" className='input input-bordered w-full' />
        <input type="password" placeholder="New Password" className='input input-bordered w-full' />
        <input type="password" placeholder="Confirm New Password" className='input input-bordered w-full' />
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
    </div>
  );
};

export default LoginData;
