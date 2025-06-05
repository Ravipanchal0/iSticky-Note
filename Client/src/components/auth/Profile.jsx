import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout as authLogout } from "../../store/authSlice.js";

import {
  useLogoutMutation,
  usePasswordUpdateMutation,
  useUpdateProfileMutation,
  useAccountDeactivateMutation,
  useDeleteAccountMutation,
} from "../../store/authApiSlice.js";

import {
  ConfirmModal,
  ProfileUpdateModal,
  PasswordChangeModal,
  Loader,
} from "../utilities/index.js";

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
  const [accountDeactivate, { isLoading: accountDeactivateLoader }] =
    useAccountDeactivateMutation();
  const [deleteAccount, { isLoading: deleteAccountLoader }] =
    useDeleteAccountMutation();

  const [modalConfig, setModalConfig] = useState(null);
  const openConfirmModal = ({ title, desc, btnTitle, onConfirm }) => {
    setModalConfig({
      title,
      desc,
      btnTitle,
      onConfirm,
    });
  };
  const closeConfirmModal = () => {
    setModalConfig(null);
  };

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [navigate, authStatus]);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    email: user?.email || "",
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
      await passwordUpdate(passwordData).unwrap();
      setChangePasswordModalOpen(false);
    } catch (err) {
      setUserError(err.data.message || err.error);
    }
  };
  const handleDeactivateAccount = async (e) => {
    e.preventDefault();
    try {
      await accountDeactivate().unwrap();
      setModalConfig(null);
      dispatch(authLogout());
      navigate("/login");
    } catch (err) {
      setUserError(err.data.message || err.error);
    }
  };

  const handleLogout = async () => {
    await logout();
    dispatch(authLogout());
    navigate("/login");
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      await deleteAccount().unwrap();
      dispatch(authLogout());
      navigate("/login");
    } catch (err) {
      setUserError(err.data.message || err.error);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      {(logoutLoader ||
        passwordUpdateLoader ||
        updateProfileLoader ||
        accountDeactivateLoader ||
        deleteAccountLoader) && <Loader />}
      {modalConfig && (
        <ConfirmModal
          title={modalConfig.title}
          desc={modalConfig.desc}
          btnTitle={modalConfig.btnTitle}
          onConfirm={modalConfig.onConfirm}
          notConfirm={closeConfirmModal}
        />
      )}
      {updateModalOpen && (
        <ProfileUpdateModal
          handleUpdateModal={handleUpdateModal}
          handleUpdateDetails={handleUpdateDetails}
          formData={formData}
          handleChange={handleChange}
          userError={userError}
        />
      )}
      {changePasswordModalOpen && (
        <PasswordChangeModal
          handlechangePasswordModal={handlechangePasswordModal}
          handleChangePassword={handleChangePassword}
          passwordData={passwordData}
          handlePasswordChange={handlePasswordChange}
          userError={userError}
        />
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
          onClick={() =>
            openConfirmModal({
              title: "Confirm Deactivation",
              desc: "Are you sure you want to deactivate your account?",
              btnTitle: "Deactivate",
              onConfirm: handleDeleteAccount,
            })
          }
          className="w-full border border-gray-200 hover:bg-gray-200 rounded bg-gray-100 text-md px-5 py-3 cursor-pointer"
        >
          Deactivate Account
        </button>
        <button
          onClick={handleLogout}
          className="w-full border border-gray-200 hover:bg-gray-200 rounded bg-gray-100 text-md px-5 py-3 cursor-pointer"
        >
          Log Out
        </button>

        <button
          onClick={() =>
            openConfirmModal({
              title: "Delete Account",
              desc: "Are you sure you want to delete your account? This action cannot be undone.",
              btnTitle: "Delete",
              onConfirm: handleDeactivateAccount,
            })
          }
          className="w-full text-red-500 border border-gray-200 hover:bg-red-500 hover:text-white rounded bg-gray-100 text-md px-5 py-3 cursor-pointer transiton duration-300 ease-in-out"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
