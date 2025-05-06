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
    <div className="mt-4 space-y-3 bg-gray-600 p-4 rounded-md shadow">
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setFieldValues({});
        }}
        className="w-full border p-2 rounded-md"
      >
        <option value="" className="bg-gray-400">
          Select category
        </option>
        {Object.values(categoryGroups).flatMap((group) =>
          group.includes.map((cat) => (
            <option key={cat} value={cat} className="bg-gray-400">
              {group.displayName} - {cat}
            </option>
          ))
        )}
      </select>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        className="w-full border p-2 rounded-md"
      />

      {selectedCategory &&
        categoryFields[selectedCategory]?.map((field) => (
          <input
            key={field}
            type="text"
            value={fieldValues[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={`Enter ${field}`}
            className="w-full border p-2 rounded-md"
          />
        ))}

      <button
        onClick={handleAddFeed}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default AddFeedForm;
