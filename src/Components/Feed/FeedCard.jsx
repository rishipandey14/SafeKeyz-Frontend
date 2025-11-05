import React, { useState, useRef } from "react";
import { categoryFields } from "./feedHelper";

const FeedCard = ({ item, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...item.data });
  const [copiedKey, setCopiedKey] = useState(null);
  const contentRef = useRef(null);

  const toggleDetails = () => setIsOpen((prev) => !prev);
  
  // Get all fields for this category
  const getAllCategoryFields = () => {
    return categoryFields[item.category] || [];
  };
  

  const handleCopy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 8500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleInputChange = (key, value) => {
    setEditedData((prev) => ({...prev, [key] : value}));
  }

  const handleSave = () => {
    const updatedItem = { ...item, data : editedData};
    onEdit(updatedItem);
    setIsEditing(false);
  }

  return (
    <div
      className={`p-4 rounded-xl bg-gray-600 border text-white border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? "ring-1 ring-green-500" : ""
      }`}
    >
      <h3
        className="font-semibold text-lg cursor-pointer text-green-200 hover:text-green-300 transition"
        onClick={toggleDetails}
      >
        {item.title}
      </h3>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isEditing
            ? "none"
            : isOpen
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",
        }}
      >
        <div className="mt-3 space-y-3 text-sm">
          {isEditing ? (
            // Show all category fields when editing
            getAllCategoryFields().map((key) => (
              <div key={key} className="flex items-start gap-3">
                <span className="font-medium capitalize text-gray-400 w-24 shrink-0">{key}:</span>
                <input
                  type={key.toLowerCase().includes("password") ? "password" : "text"}
                  value={editedData[key] || ""}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  placeholder={`Enter ${key}`}
                  className="bg-gray-900 text-white border border-gray-700 px-2 py-1 rounded w-full"
                />
              </div>
            ))
          ) : (
            // Show only filled fields when viewing
            Object.entries(item.data).map(([key, value]) => (
              <div key={key} className="flex items-start gap-3">
                <span className="font-medium capitalize text-gray-400 w-24 shrink-0">{key}:</span>
                <span className="break-all">{value}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(value, key);
                  }}
                  className="ml-auto text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {copiedKey === key ? "✓" : "📋"}
                </button>
              </div>
            ))
          )}

          <div className="mt-4 flex gap-4 text-sm">
            {isEditing ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                  }}
                  className="text-green-400 hover:text-green-300"
                >
                  ✅ Save
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(false);
                    setEditedData({ ...item.data });
                  }}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ❌ Cancel
                </button>
              </>
            ) : (
              <>
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    ✏️ Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Are you sure you want to delete this item?")) {
                        onDelete(item._id);
                      }
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    🗑️ Delete
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default FeedCard;