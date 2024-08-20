/* eslint-disable no-unused-vars */
// src/components/LoadingSpinner.jsx
import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <ClipLoader color="#7747FF" size={50} />
    </div>
  </div>
);

export default LoadingSpinner;
