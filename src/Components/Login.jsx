import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { showToast } from "../utils/toastSlice";

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
      dispatch(addUser(res?.data?.data));
      dispatch(showToast("Logged in Successfully"));
      navigate("/feed");
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
      dispatch(addUser(res?.data?.data));
      dispatch(showToast("Account created Successfully"));
      navigate("/profile");
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
    if (userData) navigate("/feed");
  }, [userData, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <div className="bg-gray-800 text-white w-full max-w-md p-8 rounded-xl shadow-lg transition-all shadow-green-200">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          {isLoginForm ? "Welcome Back 🔐" : "Create Account"}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {!isLoginForm && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) =>{
                  setFirstName(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={emailId}
            onChange={(e) => {
              setEmailId(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("");
            }}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition"
          >
            {isLoginForm ? "Login" : "Signup"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-300">
          {isLoginForm ? "New user?" : "Already have an account?"}{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? "Signup" : "Login"} here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
