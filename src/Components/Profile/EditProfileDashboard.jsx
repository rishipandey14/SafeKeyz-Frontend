import React, { useState } from 'react';
import SideBar from './SideBar';
import General from './General';
import Personal from './Personal';
import LoginData from './LoginData';
import Notification from './Notification';
import Privacy from './Privacy';

const EditProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderContent = () => {
    switch (activeTab) {
      case "general": return <General />;
      case "personal": return <Personal />;
      case "login": return <LoginData />;
      case "notification": return <Notification />;
      case "privacy": return <Privacy />;
      default: return <General />;
    }
  };

  return (
    <div className='min-h-screen bg-black text-white p-6'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='md:col-span-1'>
          <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className='md:col-span-3'>{renderContent()}</div>
      </div>
    </div>
  );
};

export default EditProfileDashboard;
