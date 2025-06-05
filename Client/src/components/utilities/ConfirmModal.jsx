import React from "react";

const ConfirmModal = (props) => {
  const { title, desc, btnTitle, onConfirm, notConfirm } = props;
  return (
    <div className="modal w-full h-full absolute top-0 left-0 backdrop-blur-xs bg-black/70 z-11 flex justify-center items-center">
      <div className="box relative w-3xl border border-gray-300 bg-white/50 rounded p-4">
        <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-4">{desc}</p>
        <div className="flex justify-end mt-6">
          <button
            onClick={notConfirm}
            className="border border-gray-300 hover:bg-gray-200 rounded bg-gray-100 text-md px-5 py-2 cursor-pointer transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="ml-3 border border-red-500 hover:bg-red-500 hover:text-white rounded text-red-500 bg-white text-md px-5 py-2 cursor-pointer transition duration-200"
          >
            {btnTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
