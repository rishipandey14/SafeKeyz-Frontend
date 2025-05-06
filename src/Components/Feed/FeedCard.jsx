import React, { useState, useRef } from "react";

const FeedCard = ({ item, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...item.data });
  const [copiedKey, setCopiedKey] = useState(null);
  const contentRef = useRef(null);

  const toggleDetails = () => setIsOpen((prev) => !prev);

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
      className={`p-4 border rounded-lg bg-gray-100 shadow-sm hover:bg-white transition-all duration-300 ${
        isOpen ? "ring-2 ring-purple-300" : ""
      }`}
    >
      <h3
        className="font-semibold text-lg text-gray-900 cursor-pointer"
        onClick={toggleDetails}
      >
        {item.title}
      </h3>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-400 ease-in-out`}
        style={{
          maxHeight: isEditing
            ? "none"
            : isOpen
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",
        }}
      >
        <div className="mt-3 space-y-2">
          <div className="space-y-2 text-sm text-gray-700">
            {Object.entries(item.data).map(([key, value]) => (
              <div key={key} className="flex items-start gap-2">
                <span className="font-medium capitalize text-gray-800 w-24 shrink-0">
                  {key}:
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  <>
                    <span className="break-all">{value}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(value, key);
                      }}
                      className="ml-auto text-s text-purple-600 hover:text-purple-800 transition-colors cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copiedKey === key ? "✓ Copied" : "📋"}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                  }}
                  className="text-sm text-green-600 cursor-pointer"
                >
                  ✅ Save
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(false);
                    setEditedData({ ...item.data }); // Reset
                  }}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  ❌ Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="text-sm text-blue-600 cursor-pointer"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item._id);
                  }}
                  className="text-sm text-red-600 cursor-pointer"
                >
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;