import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../utilities/Input.jsx";
import Button from "../utilities/Button.jsx";

import authServices from "../../controller/auth.js";
import { login as authLogin } from "../../store/authSlice.js";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRefs = {
    fullName: useRef(null),
    email: useRef(null),
    username: useRef(null),
    password: useRef(null),
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const values = {
        fullName: inputRefs.fullName.current.value,
        email: inputRefs.email.current.value,
        username: inputRefs.username.current.value,
        password: inputRefs.password.current.value,
      };
      const response = await authServices.createAccount(values);
      if (response.data) {
        try {
          const session = await authServices.login({
            loginId: values.username,
            password: values.password,
          });

          if (session) {
            dispatch(authLogin(session.data.user));
            navigate("/dashboard");
          }
        } catch (error) {
          setError(error.message);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="container z-10 w-2xl shadow bg-gray-100 p-5 rounded-lg border border-gray-300">
        <div className="header text-center relative">
          <h2 className="text-slate-800 text-2xl font-bold underline underline-offset-2 mb-2">
            iSticky Notes
          </h2>
          <p className="w-full text-slate-700 text-lg mb-5 tracking-wider">
            Create your space for unstoppable ideas
          </p>
        </div>
        <div className="error w-full my-4 text-center">
          <p className="text-red-600 text-sm">{error}</p>
        </div>

        <form onSubmit={signup} className="form flex flex-col gap-3 mt-5">
          <div className="box flex gap-5">
            <Input
              label="Full Name : "
              placeholder="Enter your fullname"
              ref={inputRefs.fullName}
            />
            <Input
              type="email"
              label="Email : "
              placeholder="Enter your email"
              ref={inputRefs.email}
            />
          </div>
          <div className="box flex gap-5">
            <Input
              label="Username : "
              placeholder="Enter your username"
              ref={inputRefs.username}
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Enter your password"
              ref={inputRefs.password}
            />
          </div>
          <Button
            type="submit"
            children="Signup"
            bgColor="bg-slate-700"
            className="w-full mt-2 cursor-pointer hover:bg-slate-800 duration-200 font-semibold tracking-wider"
          />
        </form>

        <NavLink to="/login">
          <p className="my-4">
            Already have an account?
            <button
              onClick={handleSignin}
              className="italic text-blue-600 text-sm font-semibold cursor-pointer hover:text-blue-700 duration-200"
            >
              Signin
            </button>
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Signup;
