import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("rishi@gmail.com");
  const [password, setPassword] = useState("Rishi@1403");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const location = useLocation();
  let [isLoginForm, setIsLoginForm] = useState(location.state?.isLoginForm ?? true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const handleLogin = async () => {
    if (userData) return;

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      // dispatch(showToast("Account created Successfully"));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      // dispatch(showToast("Account created Successfully"));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (isLoginForm) {
      await handleLogin();
    } else {
      await handleSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 py-12">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4 pb-2">
          {isLoginForm ? "Welcome Back 🔐" : "Signup"}
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {!isLoginForm && (
            <>
              <div>
                <label className="block text-sm mb-2">First name : </label>
                <input
                  type="text"
                  name="first Name"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last name : </label>
                <input
                  type="text"
                  name="last Name"
                  value={lastName}
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </>
          )}
          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email : </label>
            <input
              type="email"
              name="email"
              value={emailId}
              autoComplete="email"
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              autoComplete={isLoginForm ? "current-password" : "new-password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer rounded-lg font-semibold transition"
          >
            {isLoginForm ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLoginForm ? (
            <>
              New User?{" "}
              <span
                className="text-purple-400 hover:underline cursor-pointer"
                onClick={() => setIsLoginForm(false)}
              >
                Signup
              </span>{" "}
              here
            </>
          ) : (
            <>
              Existing User?{" "}
              <span
                className="text-purple-400 hover:underline cursor-pointer"
                onClick={() => setIsLoginForm(true)}
              >
                Login
              </span>{" "}
              here
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
