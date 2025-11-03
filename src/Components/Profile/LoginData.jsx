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
    <div className='bg-base-200 p-6 rounded-2xl shadow border border-base-300'>
      <h2 className='text-2xl font-semibold text-primary mb-4'>Login Details</h2>
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
          <label htmlFor='currentPassword' className='text-sm text-gray-300 block mr-5 mb-1'>
            Current Password:
          </label>
          <input 
            id="currentPassword"
            type={showExistingPassword ? 'text' : 'password'} 
            autoComplete="current-password" 
            placeholder="Enter your Current Password" 
            className='input input-bordered w-full pr-10'  // Add right padding for button
            onChange={(e) => setExistingPassword(e.target.value)}
            value={existingPassword}
          />
          <button 
            type="button" 
            onClick={() => setShowExistingPassword(prev => !prev)} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"  // Center vertically + above input
            aria-label={showExistingPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showExistingPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className='relative w-1/2'>
          <label
            htmlFor='newPassword'
            className='text-sm text-gray-300 block mb-1'
          >
            New Password:
          </label>
          <input
            id='newPassword'
            type={showNewPassword ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder='Enter your New Password'
            className='input input-bordered w-full pr-10'
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <button
            type='button'
            onClick={() => setShowNewPassword((prev) => !prev)}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 z-10'
            aria-label={showNewPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showNewPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {errors && (
          <p className='text-red-400 text-sm text-center'>{errors}</p>
        )}

        <div className='flex justify-center'>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default LoginData;
