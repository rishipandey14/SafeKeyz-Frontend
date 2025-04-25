import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import {addUser} from "../utils/userSlice"

const Login = () => {
  const [emailId, setEmailId] = useState("rishi@gmail.com")
  const [password, setPassword] = useState("Rishi@1403")
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);



  const handleLogin = async () => {
    if(userData) return;

    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId, 
        password,
      },{
        withCredentials : true
      });
      dispatch(addUser(res?.data?.data));
      console.log(res.data);
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 py-12">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-8">
          Welcome Back 🔐
        </h2>
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email : </label>
            <input
              type="email"
              name="email"
              value={emailId}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

          {/* Login Button */}
          <button
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer rounded-lg font-semibold transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;