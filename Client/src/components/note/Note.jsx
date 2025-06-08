import React from "react";
import { IoCloseSharp } from "../../assets/icons.js";

const Note = ({ title, content, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="w-full h-full flex justify-center items-center fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm p-5"
    >
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 font-bold cursor-pointer"
        >
          <IoCloseSharp size={24} />
        </button>
        <h2 className="font-semibold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-justify whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Note;
