import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Loader } from "../utilities/index.js";
import { login } from "../../store/authSlice.js";

import { useRefreshtokenMutation } from "../../store/authApiSlice.js";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const authStatus = useSelector((state) => state.auth.authStatus);

  const [refreshtoken, { isLoading: isRefreshing }] = useRefreshtokenMutation();

  async function loginByToken() {
    try {
      const response = await refreshtoken().unwrap();
      if (response.success) {
        dispatch(login(response.data));
      }
    } catch (error) {
      navigate("/login");
    } finally {
      setAuthCheckComplete(true);
    }
  }

  useEffect(() => {
    if (authentication) {
      loginByToken();
    } else {
      setAuthCheckComplete(true); // ✅ Public route, no token check needed
    }
  }, [navigate, dispatch, authentication]);

  useEffect(() => {
    if (!authCheckComplete) return;

    if (authentication && authStatus !== authentication) {
      navigate("/");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/dashboard");
    }
  }, [authStatus, navigate, authentication]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <div className="auth-layout w-full">{children}</div>
  );
};

export default AuthLayout;
