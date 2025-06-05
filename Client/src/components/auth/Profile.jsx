import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

import { logout as authLogout } from "../../store/authSlice.js";
import authServices from "../../controller/auth.js";
import userServices from "../../controller/user.js";

import {
  useLogoutMutation,
  usePasswordUpdateMutation,
  useUpdateProfileMutation,
} from "../../store/authApiSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userError, setUserError] = useState("");
  const { authStatus, user } = useSelector((state) => state.auth);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const [logout, { isLoading: logoutLoader }] = useLogoutMutation();
  const [passwordUpdate, { isLoading: passwordUpdateLoader }] =
    usePasswordUpdateMutation();
  const [updateProfile, { isLoading: updateProfileLoader }] =
    useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: user?.data?.fullName || "",
    email: user?.data?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [navigate, authStatus]);

  const handleUpdateModal = async () => {
    setUpdateModalOpen(!updateModalOpen);
  };
  const handlechangePasswordModal = async () => {
    setChangePasswordModalOpen(!changePasswordModalOpen);
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      setUserError("");
      const response = await updateProfile(formData).unwrap();
      console.log(response);
      setUpdateModalOpen(false);
    } catch (err) {
      console.log(err);
      setUserError(err.data.message || err.error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setUserError("");
      const response = await userServices.passwordUpdate(passwordData);
      console.log(response);
      setChangePasswordModalOpen(false);
    } catch (err) {
      console.log(err);
      setUserError(err.data.message || err.error);
    }
  };

  const handleLogout = async () => {
    await logout();
    dispatch(authLogout());
    navigate("/login");
  };

  return (
    <div className="h-full flex justify-center items-center">
      {updateModalOpen && (
        <div className="modal w-full h-full absolute top-0 left-0 backdrop-blur-xs bg-black/70 z-5 flex justify-center items-center">
          <div className="box relative w-3xl border border-gray-300 bg-white/30 rounded p-4">
            <button
              onClick={handleUpdateModal}
              className="close absolute top-3 right-3 cursor-pointer"
            >
              <IoClose size={28} color="#1d293d" />
            </button>
            <h2 className="text-2xl font-semibold text-slate-950">
              Details Update
            </h2>
            <p className="error text-red-500 text-sm mt-5">{userError}</p>
            <form
              onSubmit={handleUpdateDetails}
              className="w-full flex flex-col gap-5 mt-3"
            >
              <input
                name="name"
                value={formData.name}
                className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-50 focus:border-gray-300 outline-none"
                type="text"
                placeholder="Enter your name"
                onChange={handleChange}
              />
              <input
                name="email"
                value={formData.email}
                className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-50 focus:border-gray-300 outline-none"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full text-white rounded bg-slate-800 font-semibold tracking-wider py-3 cursor-pointer hover:bg-slate-700 transition duration-150"
              >
                Update Details
              </button>
            </form>
          </div>
        </div>
      )}
      {changePasswordModalOpen && (
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
      )}
      <div className="w-3xl p-10 flex flex-col gap-5 box border border-gray-300 shadow rounded backdrop-blur-md bg-white/30">
        <button
          onClick={handleUpdateModal}
          className="w-full border border-gray-200 hover:bg-gray-200 rounded bg-gray-100 text-md px-5 py-3 cursor-pointer"
        >
          Details Update
        </button>
        <button
          onClick={handlechangePasswordModal}
          className="w-full border border-gray-200 hover:bg-gray-200 rounded bg-gray-100 text-md px-5 py-3 cursor-pointer"
        >
          Change Password
        </button>
        <button
          onClick={handleLogout}
          className="w-full border border-gray-200 hover:bg-gray-200 rounded bg-gray-100 text-md px-5 py-3 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
