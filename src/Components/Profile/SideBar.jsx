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
      activeTab === tab ? "bg-green-700 text-white" : "text-gray-400  cursor-pointer"
    }`;


  if (!user) {
    return <div className="text-gray-400 text-center">Loading user info...</div>;
  }


  return (
    user && (
      <div className='bg-gray-900 rounded-2xl p-6 shadow-lg shadow-gray-400'>
        <h2 className='flex justify-center text-xl font-bold mb-4 items-center'>Edit Profile</h2>
        <div className='flex flex-col justify-center items-center'>
          <img src={user.photoUrl} className='w-25 h-25 ' alt="User Avatar" />
          <h3 className='pt-5 pb-10 text-gray-300'>{user.firstName + " " + user.lastName}</h3>
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
