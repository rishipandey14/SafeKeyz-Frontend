import React, { useEffect, useState } from "react";
import { FaLock, FaDatabase, FaShieldAlt, FaHistory } from "react-icons/fa";
import { useSelector } from "react-redux";
import RequireAuth from "./common/RequireAuth";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const ProfileDashboard = () => {

  const user = useSelector((store) => store?.user?.user);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        setProfileData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <RequireAuth>
        <div className="min-h-screen flex items-center justify-center text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading profile...</p>
          </div>
        </div>
      </RequireAuth>
    );
  }

  const stats = profileData?.stats || {};
  const userData = profileData?.user || user;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const recentActivities = [
    "Added new password for Gmail",
    "Updated master password",
    "Enabled two-factor authentication",
    "Deleted old password entry",
  ];

  const ProgressBar = ({ percentage }) => (
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden shadow-inner">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
  return (
  <RequireAuth>
  <div className="min-h-screen text-white p-8 font-sans select-none">
      {/* User Card */}
      <div className="max-w-4xl mx-auto mb-12 bg-gray-900 bg-opacity-80 rounded-3xl shadow-lg flex items-center gap-6 p-6 md:p-10 border border-green-600 hover:shadow-2xl transition-shadow duration-300">
        <img
          src={userData.photoUrl}
          alt={userData.firstName}
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-green-500 object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            Welcome back,{" "}
            <span className="text-green-400">{userData.firstName}</span>
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
          <h2 className="text-lg font-semibold mb-1">Credentials Saved</h2>
          <p className="text-4xl font-bold text-green-400">{stats.totalCredentials || 0}</p>
          <p className="text-gray-400 mt-1 text-center text-sm">Safe in your vault</p>
        </div>

        {/* Vault Size */}
        <div className="bg-gray-800 bg-opacity-70 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
          <FaDatabase className="text-green-400 text-4xl mb-3" />
          <h2 className="text-lg font-semibold mb-1">Vault Size</h2>
          <p className="text-4xl font-bold text-green-400">{parseFloat(stats.storagePercentage || 0).toFixed(1)}%</p>
          <p className="text-gray-400 mt-1 text-center text-sm">Storage used</p>
          <ProgressBar percentage={parseFloat(stats.storagePercentage || 0)} />
          {/* <small className="text-gray-500 mt-1">
            {stats.storageUsedKB || 0} KB / {((stats.storageLimit || 10240) / 1024).toFixed(0)} KB
          </small> */}
        </div>

        {/* Security Score */}
        <div className="bg-gray-800 bg-opacity-70 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
          <FaShieldAlt className="text-green-400 text-4xl mb-3" />
          <h2 className="text-lg font-semibold mb-1">Security Score</h2>
          <p className="text-4xl font-bold text-green-400">92%</p>
          <p className="text-gray-400 mt-1 text-center text-sm">Account safety level</p>
          <ProgressBar percentage={92} />
        </div>

        {/* Last Login */}
        <div className="bg-gray-800 bg-opacity-70 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center justify-center">
          <FaHistory className="text-green-400 text-4xl mb-3" />
          <h2 className="text-lg font-semibold mb-1">Profile Updated At</h2>
          <p className="text-sm text-gray-300 text-center">{formatDate(stats.updatedAt)}</p>
          <p className="text-gray-400 mt-1 text-center italic text-xs">Keep your account secure!</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="max-w-6xl mx-auto mt-14 bg-gray-900 bg-opacity-80 rounded-3xl p-6 md:p-8 shadow-lg border border-green-600">
        <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-green-400 border-b border-green-400 pb-2">
          Recent Activities
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 max-h-60 overflow-y-auto">
          {recentActivities.map((activity, idx) => (
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
    </RequireAuth>
  );
};

export default ProfileDashboard;
