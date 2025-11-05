import React from "react";
import FeedCard from "./FeedCard";

/**
 * FeedCategory component
 * Displays a list of feed cards for a specific category
 */
const FeedCategory = ({ displayName, items, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-4">
      <div className="space-y-3">
        {items.map((item) => (
          <FeedCard
            key={item._id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedCategory;
