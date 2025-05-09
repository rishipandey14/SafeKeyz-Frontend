import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";
import { showToast } from "../../utils/toastSlice";

const ProfileDetails = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    photoUrl: user.photoUrl,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async () => {
    setError("");  // clear Error

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        formData,
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res?.data?.data || res?.data))
      dispatch(showToast("Saved Successfully"))
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="bg-[#111827] text-white p-6 rounded-xl shadow-2xl w-110 transition duration-300">
      <h2 className="font-semibold text-2xl text-center pb-4">Edit Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">First Name</label>
          <input
            name="firstName"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            value={formData.firstName || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Last Name</label>
          <input
            name="lastName"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            value={formData.lastName || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Age</label>
          <input
            name="age"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            value={formData.age || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Gender</label>
          <select
            name="gender"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Photo URL</label>
          <input
            name="PhotoUrl"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
            value={formData.photoUrl}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex justify-center mt-4">
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
