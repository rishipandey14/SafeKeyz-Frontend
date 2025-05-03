import React from 'react';

const FeedCard = ({ data }) => {
  const { title, category } = data;

  return data && (
    <div className="bg-gradient-to-b from-[#2e2e44] to-[#1d1d2e] rounded-xl overflow-hidden w-full max-w-3xl mx-auto shadow-lg shadow-white hover:shadow-pink-400 transition-all duration-300 ease-in-out hover:-translate-y-2 p-6 text-white space-y-4 mb-6 relative">

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        {title}
      </h2>

      {/* Category */}
      {category && (
        <p className="text-sm text-gray-300 text-center">
          <span className="font-semibold text-white">Category:</span> {category}
        </p>
      )}

      {/* Hover Effect and Details */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 ease-in-out rounded-xl"></div>
    </div>
  );
};

export default FeedCard;
