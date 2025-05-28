import React from 'react';

const SideBar = ({ activeTab, setActiveTab }) => {
  const tabStyle = (tab) =>
    `block w-full px-4 py-2 rounded-md font-medium transition ${
      activeTab === tab ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`;

  return (
    <div className='bg-gray-900 rounded-2xl p-6 shadow-lg'>
      <h2 className='text-xl font-bold mb-4'>Edit Profile</h2>
      <nav className='space-y-2'>
        <button onClick={() => setActiveTab('general')} className={tabStyle('general')}>General</button>
        <button onClick={() => setActiveTab('personal')} className={tabStyle('personal')}>Personal</button>
        <button onClick={() => setActiveTab('login')} className={tabStyle('login')}>Login</button>
        <button onClick={() => setActiveTab('notification')} className={tabStyle('notification')}>Notification</button>
        <button onClick={() => setActiveTab('privacy')} className={tabStyle('privacy')}>Privacy</button>
      </nav>
    </div>
  );
};

export default SideBar;
