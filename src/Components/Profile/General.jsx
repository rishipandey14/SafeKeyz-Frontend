import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/constants';
import { addUser } from '../../utils/userSlice';
import { showToast } from '../../utils/toastSlice';

const General = () => {
  const user = useSelector((store) => store?.user?.user);
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState( '');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setAge(user.age || '');
      setGender(user.gender || '');
      setPhotoUrl(user.photoUrl || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
        }, {withCredentials: true});
      const updatedUser = res?.data?.data;

      if (updatedUser) {
        dispatch(addUser(updatedUser));
        dispatch(showToast("Profile updated successfully"));
      } else {
        throw new Error("Invalid user data returned from server");
      }
    } catch (err) {
      setErrors(err?.response?.data?.error || err.message || "An error occurred");
    }
  }

  return (
    <div className='bg-gray-900 p-6 rounded-2xl shadow border border-base-300'>
      <h2 className='flex justify-center text-2xl font-semibold text-white mb-6'>General Information</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {/* Image uplaod and preview */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-gray-300'>Paste a public image URL:</label>
          <input
            type='text'
            name='photoUrl'
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder='https://example.com/photo.jpg'
            className='input input-bordered w-full max-w-xs'
          />
          {photoUrl && (
            <img src={photoUrl} alt="preview" className='mt-2 w-20 h-20 rounded-full object-cover' />
          )}
        </div>
        <div >
          <label htmlFor='firstName' className='text-sm text-gray-300 mr-5'>First Name : </label>
          <input type="text" id='firstName' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className='input input-bordered w-1/2' />
        </div>
        
        <div >
          <label htmlFor='lastName' className='text-sm text-gray-300 mr-5'>Last Name : </label>
          <input type="text" id='lastName' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className='input input-bordered w-1/2' />
        </div>

        <div >
          <label htmlFor='age' className='text-sm text-gray-300 mr-15'>Age : </label>
          <input type="number" id='age' name='age' value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter Age" className='input input-bordered max-w-15' />
        </div>
        <div>
          <label htmlFor='gender' className='text-sm text-gray-300 mr-10'>Gender : </label>
          <select className='select select-bordered max-w-25' id='gender' name='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option >Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        {errors && (
          <p className='text-red-400 test-sm text-center'>{errors}</p>
        )}
        <div className='flex justify-center'>
          <button type='submit' className="btn btn-primary" >Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default General;
