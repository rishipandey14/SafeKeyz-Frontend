import React from "react";

const FeedCard = ({ item }) => {
  return (
    <div className="p-3 border rounded-md bg-gray-50">
      <h3 className="font-medium">{item.title}</h3>
      <pre className="text-sm text-gray-700 overflow-auto">
        {JSON.stringify(item.data, null, 2)}
      </pre>
    </div>
  );
};

export default FeedCard;
