import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { categoryFields, categoryGroups } from "./FeedHelper";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../utils/toastSlice";

const AddFeedForm = ({ onFeedAdded }) => {
  const dispatch = useDispatch();
  const [fieldValues, setFieldValues] = useState({});
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleInputChange = (field, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddFeed = async () => {
    try {
      const payload = {
        title,
        category: selectedCategory,
        data: fieldValues,
      };

      await axios.post(BASE_URL + "/feed/add", payload, {
        withCredentials: true,
      });
      dispatch(showToast("Data added successfully"));
      setTitle("");
      setSelectedCategory("");
      setFieldValues({});
      onFeedAdded(); // refresh parent Feed
    } catch (err) {
      console.error(err);
      dispatch(showToast("Failed to add data"));
    }
  };
  return (
    <div className="mt-4 space-y-4 bg-gray-900 border border-gray-700 p-6 rounded-md shadow-lg transition-all duration-300">
      {/* Category Selector */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setFieldValues({});
        }}
        className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      >
        <option value="">Select category</option>
        {Object.values(categoryGroups).flatMap((group) =>
          group.includes.map((cat) => (
            <option key={cat} value={cat}>
              {group.displayName} - {cat}
            </option>
          ))
        )}
      </select>

      {/* Show title + fields only after category is selected */}
      {selectedCategory && (
        <>
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {/* Dynamic category-specific fields */}
          {categoryFields[selectedCategory]?.map((field) => (
            <input
              key={field}
              type="text"
              value={fieldValues[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={`Enter ${field}`}
              className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          ))}

          {/* Submit Button */}
          <button
            onClick={handleAddFeed}
            className="bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-md transition shadow"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default AddFeedForm;
