import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/handleLogout";
import { useDispatch, useSelector } from "react-redux";
import { resetFeedState } from "../utils/feedSlice";
import { resetUserState } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout(dispatch, navigate);
    dispatch(resetFeedState());
    dispatch(resetUserState());
  };

  return (
    <nav className="navbar bg-base-300 shadow-sm px-4">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="text-2xl font-bold text-secondary  transition">
          SafeKeyz
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/about" className="hover:text-secondary transition">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-secondary transition">
              Contact Us
            </Link>
            <Link to="/docs" className="hover:text-secondary transition">
              Docs
            </Link>
            <a
              href="https://github.com/"
              className="hover:text-secondary transition"
            >
              GitHub
            </a>
          </div>

          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition duration-300 ease-in-out"
              >
                <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 shadow-md">
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
                    className="flex items-center gap-2 hover:bg-primary hover:text-white rounded-lg px-3 py-2 transition duration-200"
                  >
                    <i className="fas fa-user"></i> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 hover:bg-primary hover:text-white rounded-lg px-3 py-2 transition duration-200"
                  >
                    <i className="fas fa-cog"></i> Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={onLogoutClick}
                    className="flex items-center gap-2 hover:bg-error hover:text-white rounded-lg px-3 py-2 transition duration-200"
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
