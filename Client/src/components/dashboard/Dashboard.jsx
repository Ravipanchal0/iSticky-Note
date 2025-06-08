import React, { useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardCard from "./DashboardCard";
import { setNotes } from "../../store/noteSlice.js";
import {
  MdOutlineEventNote,
  BiCategory,
  FaRegStar,
  TbCalendarWeek,
  FaPlus,
  IoEyeOutline,
  SlCalender,
} from "../../assets/icons.js";

import { useGetAllNotesMutation } from "../../store/authApiSlice.js";
import Loader from "../utilities/Loader.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { favNotes, notes } = useSelector((state) => state.note);
  const [getAllNotes, { isLoading }] = useGetAllNotesMutation();

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllNotes().unwrap();
        if (response) {
          dispatch(setNotes(response.data.notes));
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    })();
  }, [dispatch, getAllNotes]);

  const totalNote = useMemo(() => notes.length, [notes]);
  const totalStarred = useMemo(() => favNotes.length, [favNotes]);

  // Function to count categories
  const uniqueCategories = useMemo(() => {
    return new Set(notes.map((note) => note.category)).size;
  }, [notes]);

  // Function to calculate notes created this week and month
  const totalNoteThisWeek = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date();
    const day = now.getDay(); // Sunday = 0, Monday = 1, ...
    startOfWeek.setDate(now.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0); // set to start of day

    return notes.filter((note) => new Date(note.createdAt) >= startOfWeek)
      .length;
  }, [notes]);

  const totalNoteThisMonth = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return notes.filter((note) => new Date(note.createdAt) >= startOfMonth)
      .length;
  }, [notes]);

  const dashboardCard = [
    {
      icon: <MdOutlineEventNote className="text-2xl text-blue-500" />,
      title: "Total Notes",
      bgColor: "bg-blue-500/20",
      borderColor: "border-l-blue-500",
      noOfNotes: totalNote,
    },
    {
      icon: <BiCategory className="text-2xl text-pink-500" />,
      title: "Total Categories",
      bgColor: "bg-pink-500/20",
      borderColor: "border-l-pink-500",
      noOfNotes: uniqueCategories,
    },
    {
      icon: <FaRegStar className="text-2xl text-red-500" />,
      title: "Starred Notes",
      bgColor: "bg-red-500/20",
      borderColor: "border-l-red-500",
      noOfNotes: totalStarred,
    },
    {
      icon: <TbCalendarWeek className="text-2xl text-yellow-300" />,
      title: "Created This week (7 days)",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-l-yellow-300",
      noOfNotes: totalNoteThisWeek,
    },
    {
      icon: <SlCalender className="text-xl text-green-500" />,
      title: "Created This month (30 days)",
      bgColor: "bg-green-500/20",
      borderColor: "border-l-green-500",
      noOfNotes: totalNoteThisMonth,
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <div className="dashboard w-full h-full">
        {/*  Dashboard title */}
        <div className="page-title">
          <h3 className="title text-3xl font-semibold">Dashboard</h3>
          <p className="desc text-sm text-gray-600 italic ">
            Welcome back,&nbsp;
            <span className="text-sky-600 font-semibold">
              {user?.fullName || "My User"}
            </span>
            ! Dive into the heart of your notes and get the full picture.
          </p>
        </div>

        {/*  Dashboard cards */}
        <div className="dashboard-cards grid lg:grid-cols-3 grid-cols-1 gap-5 gap-x-8 mt-10">
          {dashboardCard.map((card) => (
            <DashboardCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              bgColor={card.bgColor}
              borderColor={card.borderColor}
              noOfNotes={card.noOfNotes}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-action bg-white p-3 rounded-lg shadow-md mt-10 lg:w-80 w-full ">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <div className="p-1 flex flex-col gap-4 mt-4">
            <NavLink to={"/create-note"}>
              <button className="w-full flex items-center gap-4 bg-blue-500/20 px-4 p-2.5 rounded-md hover:cursor-pointer hover:bg-blue-500/30 transition duration-200 shadow">
                <div className="icon">
                  <FaPlus className="text-lg text-blue-500" />
                </div>
                <div className="action">Create New Note</div>
              </button>
            </NavLink>
            <NavLink to={"/notes"}>
              <button className=" w-full flex items-center gap-4 bg-green-500/20 px-4 p-2 rounded-md hover:cursor-pointer hover:bg-green-500/30 transition duration-200 shadow">
                <div className="icon">
                  <IoEyeOutline className="text-lg text-green-500" />
                </div>
                <div className="action">View Notes</div>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
