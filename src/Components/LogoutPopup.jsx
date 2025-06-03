import React from 'react';

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center backdrop-blur-sm bg-black/40 px-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg shadow-gray-400 w-full max-w-xl min-h-[250px] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center border border-gray-700">
        
        <div className="flex-shrink-0">
          <img
            src="/assets/catWithGuns.jpeg"
            alt="Angry Cat"
            className="w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-lg border border-gray-800"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center items-start text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Are you sure you want to <span className='flex justify-center items-center'>log out ?</span>
          </h2>
          <p className="text-gray-400 mb-6">
            You're leaving the world of <span className="text-green-400 font-semibold">SafeKeyz</span> 😿
          </p>
          <div className="flex flex-wrap justify-center  md:justify-start gap-4">
            <button
              onClick={onConfirm}
              className="bg-red-700 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition duration-200 shadow-md cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-md transition duration-200 shadow-md cursor-pointer"
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
