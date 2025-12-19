import React from 'react';

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center backdrop-blur-sm bg-black/20 px-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg w-full max-w-xl min-h-[250px] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center border border-gray-200">
        
        <div className="flex-shrink-0">
          <img
            src="/assets/catWithGuns.jpeg"
            alt="Sad Cat"
            className="w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-md border border-gray-200"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center items-start text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Are you sure you want to <span className='flex justify-center items-center'>log out?</span>
          </h2>
          <p className="text-gray-600 mb-6">
            You're leaving the world of <span className="text-blue-600 font-semibold">SafeKeyz</span> 😿
          </p>
          <div className="flex flex-wrap justify-center  md:justify-start gap-4">
            <button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow-md cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-6 py-2 rounded-lg transition duration-200 shadow-md cursor-pointer"
            >
              No
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LogoutPopup;
