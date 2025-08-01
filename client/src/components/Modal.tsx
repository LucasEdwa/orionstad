import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full relative animate-fadeInUp">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 font-bold focus:outline-none"
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
