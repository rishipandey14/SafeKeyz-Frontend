import React from "react";
import FeedCard from "./FeedCard";

const FeedCategory = ({ category, items, showItems, setShowIndex }) => {
  return (
    <div className="w-full md:w-8/12 mx-auto mb-4 bg-gray-100 shadow-lg rounded-lg">
      <div
        className="flex justify-between items-center p-4 cursor-pointer font-semibold text-lg bg-white rounded-t-lg"
        onClick={setShowIndex}
      >
        <span>{category} ({items.length})</span>
        <span>{showItems ? "▲" : "▼"}</span>
      </div>

      {showItems && (
        <div className="p-4 bg-gray-50 rounded-b-lg space-y-4">
          {items.map((item) => (
            <FeedCard key={item._id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedCategory;
