import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Bell, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../../utils/handleLogout";
import { resetFeedState } from "../../features/feed/feedSlice";
import { resetUserState } from "../../features/user/userSlice";
import LogoutPopup from "../common/LogoutPopup";

const Navbar = () => {
  const user = useSelector((store) => store?.user?.user);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout(dispatch, navigate);
    dispatch(resetFeedState());
    dispatch(resetUserState());
  };

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-md py-2 px-6 border-b border-gray-200 z-[100]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-full text-white font-bold text-xl">S</div>
          <Link to="/" className="text-lg font-semibold text-gray-900">SafeKeyz</Link>
        </div>

        <nav className="hidden md:flex gap-6 text-gray-700 text-sm">
          {['Pricing', 'Personal', 'Business'].map((label, idx) => (
            <div key={idx} className="relative group">
              <div className="flex flex-col">
                <button className="font-medium flex items-center gap-1 hover:text-green-600 transition-colors duration-200 ease-in-out cursor-pointer px-2 py-1 rounded-md">
                  {label} <ChevronDown size={16} />
                </button>

                <div className="absolute top-full left-0 bg-white shadow-xl rounded-md py-2 w-44 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 border border-gray-200">
                  {label === 'Pricing' && (
                    <>
                      <Link className="flex items-center gap-2 font-medium hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200" to="#">Free</Link>
                      <Link className="flex items-center gap-2 font-medium hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200" to="#">Pro</Link>
                      {user && (
                        <Link className="flex items-center gap-2 font-medium hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200" to="/billing">Billing</Link>
                      )}
                    </>
                  )}
                  {label === 'Personal' && (
                    <>
                      <Link className="flex items-center font-medium gap-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200" to="/features">Features</Link>
                      {user ? (
                        <Link className="flex items-center font-medium gap-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200" to="/account">Account</Link>
                      ) : (
                        <Link className="flex font-medium items-center gap-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200" to="#">Support</Link>
                      )}
                    </>
                  )}
                  {label === 'Business' && (
                    <>
                      <Link className="font-medium flex items-center gap-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200" to="/enterprise">Enterprise</Link>
                      {user && (
                        <Link className="font-medium flex items-center gap-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200" to="/team">Team</Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Link className="font-medium hover:text-green-600 transition-colors duration-200 ease-in-out cursor-pointer px-2 py-1 rounded-md" to="#">
            Partners
          </Link>
        </nav>

        <div className="flex gap-4 items-center">
          {!user ? (
            <Link
              to="/login"
              state={{ isLoginForm: true }}
              className="font-medium bg-green-600 hover:bg-green-700 transition text-white text-sm px-4 py-2 rounded-md shadow-sm"
            >
              Log in
            </Link>
          ) : (
            <>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Search">
                <Search size={20} className="text-gray-600" />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative" title="Notifications">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative group">
                <button className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full ring-2 ring-green-300 ring-offset-2 ring-offset-white shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                    <img alt="User Avatar" src={user.photoUrl} className="object-cover w-full h-full" />
                  </div>
                </button>
                <ul className="absolute top-full right-0 mt-2 w-60 bg-white shadow-xl rounded-lg py-2 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 border border-gray-200">
                  <li>
                    <Link to="/profile" className="flex items-center gap-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200 block w-full">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/editprofile" className="flex items-center gap-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200 block w-full">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/reportabug" className="flex items-center gap-2 hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg px-3 py-2 transition duration-200 block w-full">
                      Report a Bug
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowPopup(true)}
                      className="flex items-center gap-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg px-3 py-2 transition duration-200 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      {showPopup && (
        <LogoutPopup
          onConfirm={async () => {
            await onLogoutClick();
            setShowPopup(false);
          }}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
