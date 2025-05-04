import React, { useState } from "react";

const FeedCard = ({ item, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const toggleDetails = () => setIsOpen((prev) => !prev);

  const handleCopy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500); // clear after 1.5s
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div
      className="p-3 border rounded-md bg-gray-100 cursor-pointer"
      onClick={toggleDetails}
    >
      <h3 className="font-bold text-black">{item.title}</h3>

      {isOpen && (
        <>
          <div className="mt-2 text-sm text-gray-800 space-y-1">
            {Object.entries(item.data).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <span className="font-semibold mr-2">{key}:</span>
                <span className="mr-2 break-all">{value}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(value, key);
                  }}
                  className="text-xs text-blue-600 hover:underline"
                  title="Copy to clipboard"
                >
                  {copiedKey === key ? "Copied!" : "📋"}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              className="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item._id);
              }}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedCard;
