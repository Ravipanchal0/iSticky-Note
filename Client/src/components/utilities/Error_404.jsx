import React from "react";
import { NavLink } from "react-router-dom";

const Error_404 = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-center flex justify-center items-center flex-col gap-y-3">
        <h1 className="text-3xl font-semibold">404 - Not found</h1>
        <p className=" text-gray-700">
          Sorry, the page you are looking for does not exist.
        </p>
        <NavLink
          to="/dashboard"
          className="text-blue-600 underline mt-4 w-fit text-center"
        >
          take me Dashboard
        </NavLink>
      </div>
    </div>
  );
};

export default Error_404;
