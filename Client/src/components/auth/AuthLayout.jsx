import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Loader } from "../utilities/index.js";
import authServices from "../../controller/auth.js";
import { login } from "../../store/authSlice.js";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const [loaderShow, setLoaderShow] = useState(true);

  async function loginByToken() {
    try {
      const response = await authServices.loginByAccessToken();
      if (response) {
        console.log(response);
        dispatch(login(response.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      navigate("/login");
    }
  }

  useEffect(() => {
    loginByToken();
  }, []);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/dashboard");
    } else {
      setLoaderShow(false);
    }
  }, [authStatus, navigate, authentication]);

  return loaderShow ? (
    <div className="h-full">
      <Loader />
    </div>
  ) : (
    <div className="w-full p-5">{children}</div>
  );
};

export default AuthLayout;
