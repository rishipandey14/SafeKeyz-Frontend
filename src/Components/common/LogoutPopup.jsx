import React from 'react';
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <Modal open onClose={onCancel} title="">
      <div className="w-full min-h-[200px] flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-shrink-0">
          <img src="/assets/catWithGuns.jpeg" alt="Sad Cat" className="w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-md border border-gray-200" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-start text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Are you sure you want to <span className='flex justify-center items-center'>log out?</span>
          </h2>
          <p className="text-gray-600 mb-6">
            You're leaving the world of <span className="text-blue-600 font-semibold">SafeKeyz</span> 😿
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button variant="danger" size="md" onClick={onConfirm}>Yes</Button>
            <Button variant="secondary" size="md" onClick={onCancel}>No</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutPopup;
