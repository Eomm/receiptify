import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShareLink = ({ onShare }) => {
  const showToast = () => {
    toast.promise(
      onShare(),
      {
        pending: 'Sharing...',
        success: 'Link copied to clipboard! 🚀',
        error: 'Error creating link ❌'
      },
      {
        position: "top-center",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    )
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="flex bg-rose-400 hover:bg-rose-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out items-center justify-center"
        onClick={showToast}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
        Share
      </button>

      <ToastContainer />
    </div>
  );
};
