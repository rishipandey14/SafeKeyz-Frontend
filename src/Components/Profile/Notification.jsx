import React, { useState } from 'react';

const Notification = () => {
  const [emailNotify, setEmailNotify] = useState(false);
  const [whatsappNotify, setWhatsappNotify] = useState(false);

  return (
    <div className='bg-white p-6 rounded-2xl shadow border border-gray-200'>
      <h2 className='text-2xl font-semibold text-green-600 mb-4'>Notification Preferences</h2>
      <form className='space-y-4'>
        <label className='flex items-center space-x-2'>
          <input type="checkbox" className='w-4 h-4 accent-green-600' checked={emailNotify} onChange={() => setEmailNotify(!emailNotify)} />
          <span className='text-gray-700'>Email Notifications</span>
        </label>
        <label className='flex items-center space-x-2'>
          <input type="checkbox" className='w-4 h-4 accent-green-600' checked={whatsappNotify} onChange={() => setWhatsappNotify(!whatsappNotify)} />
          <span className='text-gray-700'>WhatsApp Notifications</span>
        </label>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">Save Preferences</button>
      </form>
    </div>
  );
};

export default Notification;
