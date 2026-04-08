import React from 'react';
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <Modal open onClose={onCancel} title="" hideClose maxWidth="max-w-xl" containerClass="overflow-hidden">
      <div className="relative">
        <button
          onClick={onCancel}
          aria-label="Close logout popup"
          className="absolute right-0 top-0 z-10 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-red-100 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-100 blur-2xl" />

        <div className="relative w-full min-h-[220px] flex flex-col md:flex-row gap-6 md:gap-7 items-center">
          <div className="flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg shadow-gray-200/70">
            <img
              src="/assets/catWithGuns.jpeg"
              alt="Sad cat asking for one more stay"
              className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            {/* <span className="mb-3 inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700">
              Confirm logout
            </span> */}
            <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900">
              Are you sure you want to log out?
            </h2>
            <p className="mt-3 max-w-md text-sm md:text-base text-gray-600">
              You are about to leave <span className="font-semibold text-blue-600">SafeKeyz</span>. Any unsaved changes may be lost.
            </p>

            <div className="mt-7 flex w-full flex-col-reverse sm:flex-row sm:items-center gap-3">
              <Button variant="secondary" size="md" className="w-full sm:w-auto px-6" onClick={onCancel}>
                Stay here
              </Button>
              <Button variant="danger" size="md" className="w-full sm:w-auto px-6 shadow-lg shadow-red-200/80" onClick={onConfirm}>
                Yes, log out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutPopup;
