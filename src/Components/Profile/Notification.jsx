import React, { useState } from 'react';

const Notification = () => {
  const [emailNotify, setEmailNotify] = useState(false);
  const [whatsappNotify, setWhatsappNotify] = useState(false);

  return (
    <div className='bg-base-200 p-6 rounded-2xl shadow border border-base-300'>
      <h2 className='text-2xl font-semibold text-primary mb-4'>Notification Preferences</h2>
      <form className='space-y-4'>
        <label className='flex items-center space-x-2'>
          <input type="checkbox" className='checkbox' checked={emailNotify} onChange={() => setEmailNotify(!emailNotify)} />
          <span>Email Notifications</span>
        </label>
        <label className='flex items-center space-x-2'>
          <input type="checkbox" className='checkbox' checked={whatsappNotify} onChange={() => setWhatsappNotify(!whatsappNotify)} />
          <span>WhatsApp Notifications</span>
        </label>
        <button type="submit" className="btn btn-primary">Save Preferences</button>
      </form>
    </div>
  );
};

export default Notification;
