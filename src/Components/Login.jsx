import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { showToast } from "../utils/toastSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("test@gmail.com");
  const [password, setPassword] = useState("Test@1234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const location = useLocation();
  let [isLoginForm, setIsLoginForm] = useState(location.state?.isLoginForm ?? true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user.user);

  const handleLogin = async () => {
    if (userData) return;
    
    // Basic validation before sending API call
    if (!emailId.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      const user = res?.data?.data;
      dispatch(addUser(user));
      dispatch(showToast("Logged in Successfully"));
      
      // Wait a bit for Redux to update before navigating
      setTimeout(() => {
        navigate("/vault");
      }, 100);
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    // Basic validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !emailId.trim() ||
      !password.trim()
    ) {
      setError("Please fill all fields before signing up.");
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      const user = res?.data?.data;
      dispatch(addUser(user));
      dispatch(showToast("Account created Successfully"));
      
      // Wait a bit for Redux to update before navigating
      setTimeout(() => {
        navigate("/vault");
      }, 100);
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isLoginForm) await handleLogin();
    else await handleSignup();
  };

  useEffect(() => {
    if (userData) navigate("/vault");
  }, [userData, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SafeKeyz</h1>
          <p className="text-gray-600">Your secure password manager</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 transition-all hover:shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isLoginForm ? "Welcome Back! 👋" : "Create Account 🚀"}
            </h2>
            <p className="text-gray-600 text-sm">
              {isLoginForm 
                ? "Enter your credentials to access your vault" 
                : "Sign up to start securing your passwords"}
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) =>{
                      setFirstName(e.target.value);
                      setError("");
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setError("");
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              />
              {isLoginForm && (
                <div className="text-right mt-2">
                  <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoginForm ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Toggle Form */}
          <p className="text-center text-gray-600">
            {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-green-600 hover:text-green-700 font-semibold hover:underline cursor-pointer"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Sign up for free" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            🔒 Protected with 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
