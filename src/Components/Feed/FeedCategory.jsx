import React from "react";
import FeedCard from "./FeedCard";

const FeedCategory = ({ displayName, items, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
