// Components/FeedCategory.jsx
import React from "react";
import FeedCard from "./FeedCard";

const FeedCategory = ({ displayName, items }) => {
  return (
    <details className="border rounded-lg p-4 bg-white shadow-md">
      <summary className="cursor-pointer text-xl font-semibold text-gray-800">
        {displayName}
      </summary>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <FeedCard key={item._id} item={item} />
        ))}
      </div>
    </details>
  );
};

export default FeedCategory;
