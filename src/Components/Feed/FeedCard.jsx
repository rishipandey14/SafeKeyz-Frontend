import React, { useState, useRef } from "react";
import { categoryFields } from "./feedHelper";

const FeedCard = ({ item, onEdit, onDelete, onShare }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...item.data });
  const [copiedKey, setCopiedKey] = useState(null);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [shareData, setShareData] = useState({
    recipientEmail: "",
    recipientName: "",
    message: "",
    expiryDays: "7",
    permission: "read", // read is default
  });
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

  const handleShareInputChange = (key, value) => {
    setShareData((prev) => ({...prev, [key]: value}));
  }

  const handleShareSubmit = async () => {
    if (!shareData.recipientEmail) return;
    
    try {
      await onShare({
        feedId: item._id,
        recipientEmail: shareData.recipientEmail,
        permission: shareData.permission,
      });
      
      setIsSharePopupOpen(false);
      // Reset form
      setShareData({
        recipientEmail: "",
        recipientName: "",
        message: "",
        expiryDays: "7",
        permission: "read",
      });
    } catch (err) {
      console.error("Share failed:", err);
    }
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
      {item?.owner && !item?.isOwner && (
        <p className="mt-1 text-xs text-gray-400">
          Shared by {item.owner.firstName} {item.owner.lastName}
          {item?.sharedAt ? (
            <span> · {new Date(item.sharedAt).toLocaleDateString()}</span>
          ) : null}
        </p>
      )}

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
                {onEdit && (item.isOwner || item.permission === 'write') && (
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
                {onShare && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSharePopupOpen(true);
                    }}
                    className="text-green-400 hover:text-green-300"
                  >
                    🔗 Share
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

      {/* Share Popup Modal */}
      {isSharePopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsSharePopupOpen(false)}
        >
          <div 
            className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Share "{item.title}"
            </h2>
            
            <div className="space-y-4">
              {/* Recipient Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Recipient Email *
                </label>
                <input
                  type="email"
                  value={shareData.recipientEmail}
                  onChange={(e) => handleShareInputChange("recipientEmail", e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full bg-gray-900 text-white border border-gray-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={shareData.recipientName}
                  onChange={(e) => handleShareInputChange("recipientName", e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-gray-900 text-white border border-gray-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={shareData.message}
                  onChange={(e) => handleShareInputChange("message", e.target.value)}
                  placeholder="Add a message for the recipient..."
                  rows="3"
                  className="w-full bg-gray-900 text-white border border-gray-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              {/* Permission */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Permission
                </label>
                <select
                  value={shareData.permission}
                  onChange={(e) => handleShareInputChange("permission", e.target.value)}
                  className="w-full bg-gray-900 text-white border border-gray-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="read">Read</option>
                  <option value="write">Read and Write</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">Write allows editing; Read restricts to viewing.</p>
              </div>

              {/* Expiry Days */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Access Expires In
                </label>
                <select
                  value={shareData.expiryDays}
                  onChange={(e) => handleShareInputChange("expiryDays", e.target.value)}
                  className="w-full bg-gray-900 text-white border border-gray-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="1">1 Day</option>
                  <option value="3">3 Days</option>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleShareSubmit}
                disabled={!shareData.recipientEmail}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Share
              </button>
              <button
                onClick={() => setIsSharePopupOpen(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default FeedCard;