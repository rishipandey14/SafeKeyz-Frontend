import React from 'react';

const FeedCard = ({ data }) => {
  const {title, category} = data;

  return data && (
    <div className="bg-gradient-to-b from-[#2e2e44] to-[#1d1d2e] rounded-xl overflow-hidden w-full max-w-3xl mx-auto shadow-md shadow-white hover:shadow-pink-400 transition-transform duration-300 ease-in-out hover:-translate-y-1 p-6 text-white space-y-2 mb-3">

      {/* Name */}
      <h2 className="text-2xl font-bold text-center">
        {title}
      </h2>
      {category && (
        <p className="text-sm text-gray-300 text-center">
          <span className="font-semibold text-white">Category : </span> {category}
        </p>
      )}
      
    </div>
  );
};

export default FeedCard;
