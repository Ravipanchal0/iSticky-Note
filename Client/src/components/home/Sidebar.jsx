import React from "react";
import { NavLink } from "react-router-dom";
import {
  RiDashboardFill,
  GrNotes,
  FaRegStar,
  VscDebugBreakpointData,
} from "../../assets/icons.js";

import { useSelector } from "react-redux";

const Sidebar = () => {
  const categoriess = useSelector((state) => state.note.categories);

  console.log(categoriess);

  const categories = [
    { name: "Work", textColor: "text-blue-600" },
    { name: "Personal", textColor: "text-pink-500" },
    { name: "Important", textColor: "text-red-600" },
    { name: "To Do", textColor: "text-yellow-500" },
    { name: "Ideas", textColor: "text-purple-500" },
    { name: "Reminders", textColor: "text-green-600" },
  ];
  return (
    <div className="navbar w-xs h-auto bg-slate-100 border-r border-gray-400">
      <ul className="flex flex-col gap-4 px-4 pt-10">
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <li
              className={`px-5 py-1 cursor-pointer flex items-center gap-3 text-lg rounded 
        ${
          isActive
            ? "text-blue-500 bg-white/50"
            : "text-gray-700 hover:text-blue-500 hover:bg-white/35 hover:rounded"
        }`}
            >
              <RiDashboardFill /> Dashboard
            </li>
          )}
        </NavLink>

        <NavLink to="/notes">
          {({ isActive }) => (
            <li
              className={`px-5 py-1 cursor-pointer flex items-center gap-3 text-lg rounded 
        ${
          isActive
            ? "text-blue-500 bg-white/50"
            : "text-gray-700 hover:text-blue-500 hover:bg-white/35 hover:rounded"
        }`}
            >
              <GrNotes /> All Notes
            </li>
          )}
        </NavLink>
        <NavLink to="/favorites">
          {({ isActive }) => (
            <li
              className={`px-5 py-1 cursor-pointer flex items-center gap-3 text-lg rounded 
      ${
        isActive
          ? "text-blue-500 bg-white/50"
          : "text-gray-700 hover:text-blue-500 hover:bg-white/35 hover:rounded"
      }`}
            >
              <FaRegStar /> Favorites
            </li>
          )}
        </NavLink>
      </ul>
      <div className="separator border-b border-gray-400 my-8"></div>
      <div className="category px-4">
        <label
          htmlFor="category"
          className="text-gray-700 tracking-wider font-semibold px-5"
        >
          CATEGORY
        </label>
        <ul className="flex flex-col gap-1 px-6">
          {categoriess.map((category) => (
            <li key={category} className={` flex gap-3 items-center`}>
              <VscDebugBreakpointData />
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
