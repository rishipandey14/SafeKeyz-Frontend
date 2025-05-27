import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../utils/handleLogout';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationPreference, setNotificationPreference] = useState("Allow");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);

  return (
    user && (
      <div className="w-72 bg-[#111827] text-white rounded-xl shadow-2xl p-5 h-76 transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.photoUrl || '/avatar.png'}
            alt="User Avatar"
            className="w-14 h-14 rounded-full border border-gray-600"
          />
          <div>
            <p className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-sm text-gray-400">{user.emailId}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <button className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded transition">👤 My Profile</button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded transition"
          >
            ⚙️ Settings
          </button>
          {showSettings && (
            <div className="ml-4 mt-1 space-y-1 text-gray-300 text-xs">
              <div>• Theme: Dark</div>
              <div>• Language: English</div>
            </div>
          )}

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded transition"
          >
            🔔 Notifications
          </button>

          {showNotifications && (
            <div className="ml-4">
              <select
                value={notificationPreference}
                onChange={(e) => setNotificationPreference(e.target.value)}
                className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm w-full mt-2"
              >
                <option value="Allow">Allow</option>
                <option value="Mute">Mute</option>
              </select>
            </div>
          )}

          <button
            onClick={() => handleLogout(dispatch, navigate)}
            className="w-full text-left text-red-400 hover:bg-red-500 hover:text-white px-3 py-2 rounded transition"
          >
            🚪 Log out
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileDropdown;
