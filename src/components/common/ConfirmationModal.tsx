// Modal.jsx
import React from 'react';
import { IoClose } from 'react-icons/io5';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  disabledButton: boolean;
  children: React.ReactNode;
  labelCancel?: string;
  labelConfirm?: string;
  showFooter?: boolean;
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  disabledButton = false,
  labelCancel,
  labelConfirm,
  showFooter = true,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className='relative'>
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <button 
            className='absolute top-0 right-0 transition-all ease-in-out duration-300 hover:scale-105'
            onClick={onClose}
          >
            <IoClose size={25} className='font-bold' />
          </button>
        </div>
        <hr />
        {children}
        {showFooter &&
          <>
            <hr className='my-4' />
            <div className="flex justify-between space-x-4">
              <button
                disabled={disabledButton}
                onClick={onClose}
                className="px-4 py-2 bg-red-300 text-red-800 rounded-xl hover:bg-red-500 hover:text-white transition-all ease-in-out duration-300 font-semibold"
              >
                {labelCancel || "Cancel"}
              </button>
              <button
                disabled={disabledButton}
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-600 transition-all ease-in-out duration-300 font-semibold disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
              >
                {labelConfirm || "Confirm"}
              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default ConfirmationModal;