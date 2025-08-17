// src/components/CustomCartToast.jsx
import React from 'react';
import { toast } from 'react-hot-toast'; // Import toast to dismiss the toast

const CustomCartToast = ({ productName, productImage, message, t }) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
  >
    <div className="flex-shrink-0">
      <img
        className="h-12 w-12 rounded-md object-cover"
        src={productImage}
        alt={productName}
      />
    </div>
    <div className="ml-3 flex-1">
      <p className="text-sm font-medium text-gray-900">
        {productName}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        {message}
      </p>
    </div>
    <div className="flex flex-shrink-0 items-center ml-4">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <span className="sr-only">Close</span>
        {/* Heroicon name: x-mark */}
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  </div>
);

export default CustomCartToast;