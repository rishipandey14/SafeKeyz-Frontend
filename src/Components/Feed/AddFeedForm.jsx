import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { categoryFields, categoryGroups } from "./feedHelper";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../features/toast/toastSlice";

const AddFeedForm = ({ onFeedAdded, preSelectedCategory }) => {
  const dispatch = useDispatch();
  const [fieldValues, setFieldValues] = useState({});
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Set the category based on the sidebar selection
  React.useEffect(() => {
    if (preSelectedCategory) {
      // Map the grouped category key to the first specific category in that group
      const group = categoryGroups[preSelectedCategory];
      if (group && group.includes && group.includes.length > 0) {
        setSelectedCategory(group.includes[0]);
        setFieldValues({});
      }
    }
  }, [preSelectedCategory]);

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
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-lg shadow-xl border border-gray-700 mb-4">
      <h3 className="text-lg font-semibold text-white mb-3">Add New Item</h3>
      
      {/* Category Selector */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1.5">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setFieldValues({});
            }}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          >
            <option value="">Select category</option>
            {preSelectedCategory && categoryGroups[preSelectedCategory] ? (
              categoryGroups[preSelectedCategory].includes.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))
            ) : (
              Object.values(categoryGroups).flatMap((group) =>
                group.includes.map((cat) => (
                  <option key={cat} value={cat}>
                    {group.displayName} - {cat}
                  </option>
                ))
              )
            )}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1.5">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>
      </div>

      {/* Dynamic category-specific fields */}
      {selectedCategory && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {categoryFields[selectedCategory]?.map((field) => (
            <div key={field}>
              <label className="block text-gray-300 text-sm font-medium mb-1.5 capitalize">{field}</label>
              <input
                type={field.toLowerCase().includes("password") ? "password" : "text"}
                value={fieldValues[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Enter ${field}`}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {selectedCategory && (
        <button
          onClick={handleAddFeed}
          className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold py-2 px-4 rounded-lg transition shadow-md text-sm"
        >
          Add Item
        </button>
      )}
    </div>
  );
};

export default AddFeedForm;
