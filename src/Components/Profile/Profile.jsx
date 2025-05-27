import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import ProfileDetails from './ProfileDetails';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user.user);

  return (
    user && (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-10">
        <div className="flex gap-20">
          <ProfileDropdown />
          <ProfileDetails />
        </div>
      </div>
    )
  );
};

export default Profile;
