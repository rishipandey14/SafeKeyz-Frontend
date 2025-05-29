import React from "react";
import FeedCard from "./FeedCard";

const FeedCategory = ({ displayName, items, onEdit, onDelete }) => {
  return (
    <details className="border border-gray-800 rounded-xl p-4 bg-gradient-to-r from-gray-900 to-black shadow-md hover:shadow-lg transition-all duration-300">
      <summary className="cursor-pointer text-xl font-semibold text-gray-300 hover:text-white transition-colors duration-200">
        {displayName}
      </summary>
      <div className="mt-4 space-y-3">
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
