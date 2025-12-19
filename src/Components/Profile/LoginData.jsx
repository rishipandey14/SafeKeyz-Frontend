import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/constants';
import { showToast } from '../../utils/toastSlice';
import {handleLogout} from '../../utils/handleLogout';
import { useNavigate } from 'react-router-dom';
import { resetFeedState } from '../../utils/feedSlice';
import { resetUserState } from '../../utils/userSlice';

const LoginData = () => {
  const user = useSelector((store) => store?.user?.user);
  const [existingPassword, setExistingPassword] = useState('');
  const [showExistingPassword, setShowExistingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')

    if(!existingPassword || !newPassword){
      setErrors("Both password fields are required");
      return;
    }
    try {
      await axios.patch(BASE_URL + "/profile/password/change", {existingPassword, newPassword}, {withCredentials: true});
      dispatch(showToast("Password changed Successfully"));
      setExistingPassword('');
      setNewPassword('');
      dispatch(resetFeedState());
      dispatch(resetUserState());
      setTimeout(() => {
        handleLogout(dispatch, navigate);
      }, 1000);
    } catch(err){
      setErrors(err?.response?.data?.error || err.message || "An error occurred");
    }
  }

  return (
    <div className='bg-white p-6 rounded-2xl shadow border border-gray-200'>
      <h2 className='text-2xl font-semibold text-green-600 mb-4'>Login Details</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {/* Hidden email input for accessibility */}
        <input
          type="email"
          name="email"
          autoComplete="username"
          value={user?.email || ''}
          readOnly
          hidden
        />

        {/* Wrap existing password input and button in relative container */}
        <div className='relative w-1/2'>
          <label htmlFor='currentPassword' className='text-sm text-gray-700 font-medium block mr-5 mb-1'>
            Current Password:
          </label>
          <input 
            id="currentPassword"
            type={showExistingPassword ? 'text' : 'password'} 
            autoComplete="current-password" 
            placeholder="Enter your Current Password" 
            className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg w-full pr-10 focus:outline-none focus:ring-2 focus:ring-green-500'
            onChange={(e) => setExistingPassword(e.target.value)}
            value={existingPassword}
          />
          <button 
            type="button" 
            onClick={() => setShowExistingPassword(prev => !prev)} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 z-10 hover:text-gray-900"
            aria-label={showExistingPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showExistingPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className='relative w-1/2'>
          <label
            htmlFor='newPassword'
            className='text-sm text-gray-700 font-medium block mb-1'
          >
            New Password:
          </label>
          <input
            id='newPassword'
            type={showNewPassword ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder='Enter your New Password'
            className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg w-full pr-10 focus:outline-none focus:ring-2 focus:ring-green-500'
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <button
            type='button'
            onClick={() => setShowNewPassword((prev) => !prev)}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 z-10 hover:text-gray-900'
            aria-label={showNewPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showNewPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {errors && (
          <p className='text-red-600 text-sm text-center'>{errors}</p>
        )}

        <div className='flex justify-center'>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default LoginData;
