import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-green-600 text-black text-sm py-2 px-4 text-center relative">
      See another pricing and advantage at SafeKeyz Special Launch 2025.
      <Link to="#" className="underline font-medium ml-1">See now</Link>
      <button onClick={() => setVisible(false)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-white cursor-pointer">
        &times;
      </button>
    </div>
  );
};

export default Banner;
