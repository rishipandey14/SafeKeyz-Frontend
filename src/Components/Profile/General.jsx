import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/constants';
import { addUser } from '../../features/user/userSlice';
import { showToast } from '../../features/toast/toastSlice';

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
    // clear previous errors before attempting submit
    setErrors('');
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
          firstName,
          lastName,
          age: age ? Number(age) : undefined,
          gender,
          photoUrl,
        }, {withCredentials: true});
      const updatedUser = res?.data?.data;

      if (updatedUser) {
        dispatch(addUser(updatedUser));
        // clear any previous error message on success
        setErrors('');
        dispatch(showToast("Profile updated successfully"));
      } else {
        throw new Error("Invalid user data returned from server");
      }
    } catch (err) {
      setErrors(err?.response?.data?.error || err.message || "An error occurred");
    }
  }

  return (
    <div className='bg-white p-6 rounded-2xl shadow border border-gray-200'>
      <h2 className='flex justify-center text-2xl font-semibold text-gray-900 mb-6'>General Information</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {/* Image uplaod and preview */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-gray-700 font-medium'>Paste a public image URL:</label>
          <input
            type='text'
            name='photoUrl'
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder='https://example.com/photo.jpg'
            className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          {photoUrl && (
            <img src={photoUrl} alt="preview" className='mt-2 w-20 h-20 rounded-full object-cover' />
          )}
        </div>
        <div >
          <label htmlFor='firstName' className='text-sm text-gray-700 font-medium mr-5'>First Name : </label>
          <input type="text" id='firstName' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500' />
        </div>
        
        <div >
          <label htmlFor='lastName' className='text-sm text-gray-700 font-medium mr-5'>Last Name : </label>
          <input type="text" id='lastName' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500' />
        </div>

        <div >
          <label htmlFor='age' className='text-sm text-gray-700 font-medium mr-15'>Age : </label>
          <input type="number" id='age' name='age' value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter Age" className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg max-w-15 focus:outline-none focus:ring-2 focus:ring-green-500' />
        </div>
        <div>
          <label htmlFor='gender' className='text-sm text-gray-700 font-medium mr-10'>Gender : </label>
          <select className='bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg max-w-25 focus:outline-none focus:ring-2 focus:ring-green-500' id='gender' name='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {errors && (
          <p className='text-red-600 test-sm text-center'>{errors}</p>
        )}
        <div className='flex justify-center'>
          <button type='submit' className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium" >Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default General;
