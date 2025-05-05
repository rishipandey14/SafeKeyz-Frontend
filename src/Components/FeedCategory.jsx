import React from "react";
import FeedCard from "./FeedCard";

const FeedCategory = ({ displayName, items, onEdit, onDelete }) => {
  return (
    <details className="border rounded-lg p-4 bg-gradient-to-r from-pink-600 to-purple-700 shadow-lg shadow-gray-500 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
      <summary className="cursor-pointer text-xl font-semibold text-gray-200 transition-colors duration-200 hover:text-gray-700">
        {displayName}
      </summary>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <FeedCard
            key={item._id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </details>
  );
};

export default FeedCategory;
