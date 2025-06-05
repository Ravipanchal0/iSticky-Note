import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../utilities/Input.jsx";
import Button from "../utilities/Button.jsx";
import { login as authLogin } from "../../store/authSlice.js";
import { setNotes } from "../../store/noteSlice.js";

import { useDispatch } from "react-redux";
import {
  useGetAllNotesMutation,
  useLoginMutation,
} from "../../store/authApiSlice.js";
import Loader from "../utilities/Loader.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const loginRef = useRef();
  const passwordRef = useRef();

  const [login, { isLoading: loginLoader }] = useLoginMutation();
  const [getAllNotes, { isLoading: notesLoader }] = useGetAllNotesMutation();

  async function fetchAllNotes() {
    const response = await getAllNotes().unwrap();
    if (response) {
      dispatch(setNotes(response.data?.notes));
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const session = await login({
        loginId: loginRef.current.value,
        password: passwordRef.current.value,
      }).unwrap();
      if (session) {
        dispatch(authLogin(session.data?.user));
        await fetchAllNotes();
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.data.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      {(loginLoader || notesLoader) && <Loader />}
      <div className="container z-10 w-lg shadow bg-gray-100 p-5 rounded-lg border border-gray-300">
        <div className="header text-center relative">
          <h2 className="text-slate-800 text-2xl font-bold underline underline-offset-2 mb-2">
            iSticky Notes
          </h2>
          <p className=" w-full text-slate-700 text-lg mb-5 tracking-wider">
            Sign in to unlock your creativity
          </p>
        </div>
        <div className="error w-full my-4 text-center">
          <p className=" text-red-600 text-sm">{error}</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <Input
            label="Username or Email : "
            placeholder="Enter your username or email"
            ref={loginRef}
          />
          <Input
            label="Password : "
            type="password"
            placeholder="Enter your password"
            ref={passwordRef}
          />
          <Button
            type="submit"
            children="Login"
            bgColor="bg-slate-700"
            className="w-full mt-2 cursor-pointer hover:bg-slate-800 duration-200 font-semibold tracking-wider"
          />
        </form>

        <NavLink to="/signup">
          <p className="my-4">
            Don't have an account?
            <button className="italic text-blue-600 text-sm font-semibold cursor-pointer hover:text-blue-700 duration-200">
              Create Account
            </button>
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
