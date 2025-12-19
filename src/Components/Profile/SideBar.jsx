import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SideBar = ({ activeTab, setActiveTab }) => {

  const globalUser = useSelector((store) => store?.user?.user);
  const [user, setUser] = useState(globalUser);

  useEffect(() => {
    if (globalUser) {
      setUser(globalUser);
    }
  }, [globalUser]);


  const tabStyle = (tab) =>
    `block text-left w-full px-4 py-2 rounded-md font-small transition-transform duration-300 hover:translate-x-1 ${
      activeTab === tab ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100 cursor-pointer"
    }`;


  if (!user) {
    return <div className="text-gray-600 text-center">Loading user info...</div>;
  }


  return (
    user && (
      <div className='bg-white rounded-2xl p-6 shadow-md border border-gray-200'>
        <h2 className='flex justify-center text-xl font-bold mb-4 items-center text-gray-900'>Edit Profile</h2>
        <div className='flex flex-col justify-center items-center'>
          <img src={user.photoUrl} className='w-24 h-24 rounded-full border-2 border-gray-200' alt="User Avatar" />
          <h3 className='pt-5 pb-10 text-gray-700'>{user.firstName + " " + user.lastName}</h3>
        </div>
        <nav className='space-y-2'>
          <button onClick={() => setActiveTab('general')} className={tabStyle('general')}>General</button>
          <button onClick={() => setActiveTab('personal')} className={tabStyle('personal')}>Personal</button>
          <button onClick={() => setActiveTab('login')} className={tabStyle('login')}>Login</button>
          <button onClick={() => setActiveTab('notification')} className={tabStyle('notification')}>Notification</button>
          <button onClick={() => setActiveTab('privacy')} className={tabStyle('privacy')}>Privacy</button>
        </nav>
      </div>
    )
  );
};

export default SideBar;
