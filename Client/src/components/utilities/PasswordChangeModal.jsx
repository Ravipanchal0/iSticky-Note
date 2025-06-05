import React from "react";

import { IoClose } from "react-icons/io5";

const PasswordChangeModal = (props) => {
  const {
    handlechangePasswordModal,
    handleChangePassword,
    passwordData,
    handlePasswordChange,
    userError,
  } = props;
  return (
    <div className="modal w-full h-full absolute top-0 left-0 backdrop-blur-xs bg-black/70 z-5 flex justify-center items-center">
      <div className="box relative w-3xl border border-gray-300 bg-white/30 rounded p-4">
        <button
          onClick={handlechangePasswordModal}
          className="close absolute top-3 right-3 cursor-pointer"
        >
          <IoClose size={28} color="#1d293d" />
        </button>
        <h2 className="text-2xl font-semibold text-slate-950">
          Change Password
        </h2>
        <p className="error text-red-500 text-sm mt-5">{userError}</p>
        <form
          onSubmit={handleChangePassword}
          className="w-full flex flex-col gap-5 mt-3"
        >
          <input
            name="oldPassword"
            value={passwordData.oldPassword}
            className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-50 focus:border-gray-300 outline-none"
            type="password"
            placeholder="Old Password"
            onChange={handlePasswordChange}
          />
          <input
            name="newPassword"
            value={passwordData.newPassword}
            className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-50 focus:border-gray-300 outline-none"
            type="password"
            placeholder="New Password"
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            className="w-full text-white rounded bg-slate-800 font-semibold tracking-wider py-3 cursor-pointer hover:bg-slate-700 transition duration-150"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
