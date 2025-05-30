import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {handleLogout} from "../utils/handleLogout";
import { resetFeedState } from "../utils/feedSlice";
import { resetUserState } from "../utils/userSlice";
import LogoutPopup from './LogoutPopup';

const Navbar = () => {
  const user = useSelector((store) => store?.user?.user);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout(dispatch, navigate);
    dispatch(resetFeedState());
    dispatch(resetUserState());
  }

  return (
    <header className="top-0 left-0 right-0 bg-black shadow-sm shadow-gray-300 py-4 px-6 border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-green-500 p-2 rounded-full text-black font-bold text-xl">S</div>
          <Link to="/" className="text-lg font-semibold">SafeKeyz</Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-300 text-sm">
          {/* Conditionally show Feed if logged in */}
          {user && (
            <Link
              className="hover:text-green-500 transition-colors duration-200 ease-in-out cursor-pointer shadow-md px-2 py-1 rounded-md"
              to="/feed"
            >
              Feed
            </Link>
          )}

          {/* Dropdowns */}
          {['Pricing', 'Personal', 'Business'].map((label, idx) => (
            <div key={idx} className="relative group">
              <div className="flex flex-col">
                <button className="font-medium flex items-center gap-1 hover:text-green-500 transition-colors duration-200 ease-in-out cursor-pointer shadow-md px-2 py-1 rounded-md">
                  {label} <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                <div className="absolute top-full left-0 bg-gray-900 shadow-xl rounded-md py-2 w-44 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                  {label === 'Pricing' && (
                    <>
                      <Link className="flex items-center gap-2 font-medium  hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200" to="#">Free</Link>
                      <Link className="flex items-center gap-2 font-medium  hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200" to="#">Pro</Link>
                      {user && (
                        <Link className="flex items-center gap-2 font-medium  hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200" to="/billing">Billing</Link>
                      )}
                    </>
                  )}
                  {label === 'Personal' && (
                    <>
                      <Link className="flex items-center font-medium  gap-2 hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200" to="/features">Features</Link>
                      {user ? (
                        <Link className="flex items-center font-medium  gap-2 hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200" to="/account">Account</Link>
                      ) : (
                        <Link className="flex font-medium  items-center gap-2 hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200" to="#">Support</Link>
                      )}
                    </>
                  )}
                  {label === 'Business' && (
                    <>
                      <Link className="font-medium flex items-center gap-2 hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200" to="/enterprise">Enterprise</Link>
                      {user && (
                        <Link className="font-medium flex items-center gap-2 hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200" to="/team">Team</Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Static item */}
          <Link className="font-medium hover:text-green-500 transition-colors duration-200 ease-in-out cursor-pointer shadow-md px-2 py-1 rounded-md" to="#">
            Partners
          </Link>
        </nav>

        {/* Login / Auth Buttons */}
        <div className="flex gap-4 items-center">
          {!user ? (
            <Link
              to="/login"
              state={{ isLoginForm: true }}
              className="font-medium bg-green-500 hover:bg-green-600 transition text-black text-sm px-4 py-2 rounded-md"
            >
              Log in
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition duration-300 ease-in-out"
              >
                <div className="w-10 rounded-full ring ring-green-300 ring-offset-green-200 ring-offset-2 shadow-md">
                  <img
                    alt="User Avatar"
                    src={user.photoUrl}
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-base-100/90 backdrop-blur-md rounded-xl w-60 space-y-1"
              >
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/editprofile"
                    className="flex items-center gap-2 hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200"
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reportabug"
                    className="flex items-center gap-2 hover:bg-green-700  rounded-lg px-3 py-2 transition duration-200"
                  >
                    Report a Bug
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="flex items-center gap-2 hover:bg-red-800  rounded-lg px-3 py-2 transition duration-200 w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
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
    </header>
  );
};

export default Navbar;
