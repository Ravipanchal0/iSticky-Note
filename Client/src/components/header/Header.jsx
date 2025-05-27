import React from "react";
import { MdNoteAlt } from "../../assets/icons.js";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../utilities/index.js";

const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.authStatus);

  const navMenu = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
  ];

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-between items-center bg-slate-500/90 px-14 py-2 border-b border-gray-400">
      <Link to="/" className="logo flex items-center gap-2">
        <MdNoteAlt className="text-3xl text-white" />
        <h1 className="font-bold text-xl tracking-wide text-white">
          iSticky Notes
        </h1>
      </Link>
      <div className="menu">
        <ul className="flex gap-x-14 text-gray-300">
          {navMenu.map(
            (navItem) =>
              navItem.active && (
                <button
                  key={navItem.name}
                  onClick={() => navigate(navItem.slug)}
                >
                  <li className="tracking-wide hover:text-gray-100 transition duration-100 cursor-pointer font-semibold">
                    {navItem.name}
                  </li>
                </button>
              )
          )}
        </ul>
      </div>
      <div>
        {!authStatus ? (
          <div className="login">
            <Button
              children="Log In"
              bgColor="bg-slate-600/80"
              className="cursor-pointer font-semibold hover:bg-slate-600 transition duration-200"
              onClick={handleLogin}
            />
          </div>
        ) : (
          <div className="profile">
            <Link
              to="/profile"
              className="size-10 rounded-full border bg-green-700 flex justify-center items-center font-bold text-white"
            >
              R
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
