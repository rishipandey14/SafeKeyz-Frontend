import React from "react";
import { FaLock, FaDatabase, FaShieldAlt, FaHistory } from "react-icons/fa";
import { useSelector } from "react-redux";


const ProfileDashboard = () => {

  const user = useSelector((store) => store?.user?.user);

  const stats = {
    userName: user.firstName,
    userPhoto: user.photoUrl, // Replace with your user photo URL
    passwordsSaved: 58,
    vaultSize: 1.2, // in MB
    lastLogin: "2025-05-28 10:45 AM",
    securityScore: 92,
    recentActivities: [
      "Added new password for Gmail",
      "Updated master password",
      "Enabled two-factor authentication",
      "Deleted old password entry",
    ],
  };

  const ProgressBar = ({ percentage }) => (
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden shadow-inner">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
  return (
    <div className="min-h-screen text-white p-8 font-sans select-none">
      {/* User Card */}
      <div className="max-w-4xl mx-auto mb-12 bg-gray-900 bg-opacity-80 rounded-3xl shadow-lg flex items-center gap-6 p-6 md:p-10 border border-green-600 hover:shadow-2xl transition-shadow duration-300">
        <img
          src={user.photoUrl}
          alt={stats.userName}
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-green-500 object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            Welcome back,{" "}
            <span className="text-green-400">{user.firstName}</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            Here's a quick overview of your vault and activity.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Passwords Saved */}
        <div className="bg-gray-800 bg-opacity-70 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
          <FaLock className="text-green-400 text-4xl mb-3" />
          <h2 className="text-lg font-semibold mb-1">Passwords Saved</h2>
          <p className="text-4xl font-bold text-green-400">{stats.passwordsSaved}</p>
          <p className="text-gray-400 mt-1 text-center text-sm">Safe in your vault</p>
        </div>

        {/* Vault Size */}
        <div className="bg-gray-800 bg-opacity-70 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
          <FaDatabase className="text-green-400 text-4xl mb-3" />
          <h2 className="text-lg font-semibold mb-1">Vault Size</h2>
          <p className="text-4xl font-bold text-green-400">{stats.vaultSize} MB</p>
          <p className="text-gray-400 mt-1 text-center text-sm">Storage used</p>
          <ProgressBar percentage={(stats.vaultSize / 10) * 100} />
          <small className="text-gray-500 mt-1">Max 10 MB</small>
        </div>

        {/* Security Score */}
        <div className="bg-gray-800 bg-opacity-70 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
          <FaShieldAlt className="text-green-400 text-4xl mb-3" />
          <h2 className="text-lg font-semibold mb-1">Security Score</h2>
          <p className="text-4xl font-bold text-green-400">{stats.securityScore}%</p>
          <p className="text-gray-400 mt-1 text-center text-sm">Account safety level</p>
          <ProgressBar percentage={stats.securityScore} />
        </div>

        {/* Last Login */}
        <div className="bg-gray-800 bg-opacity-70 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center justify-center">
          <FaHistory className="text-green-400 text-4xl mb-3" />
          <h2 className="text-lg font-semibold mb-1">Last Login</h2>
          <p className="text-lg text-gray-300">{stats.lastLogin}</p>
          <p className="text-gray-400 mt-1 text-center italic text-xs">Keep your account secure!</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="max-w-6xl mx-auto mt-14 bg-gray-900 bg-opacity-80 rounded-3xl p-6 md:p-8 shadow-lg border border-green-600">
        <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-green-400 border-b border-green-400 pb-2">
          Recent Activities
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 max-h-60 overflow-y-auto">
          {stats.recentActivities.map((activity, idx) => (
            <li
              key={idx}
              className="hover:text-green-400 transition-colors cursor-pointer select-text"
              title={activity}
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileDashboard;
