import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 text-sm py-3 text-center border-t border-gray-800">
      &copy; {new Date().getFullYear()} SafeKeyz. All rights reserved.
    </footer>
  );
};

export default Footer;