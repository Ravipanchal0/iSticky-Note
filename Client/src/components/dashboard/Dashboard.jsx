import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardCard from "./DashboardCard";
import {
  MdOutlineEventNote,
  BiCategory,
  FaRegStar,
  TbCalendarWeek,
  FaPlus,
  IoEyeOutline,
  SlCalender,
} from "../../assets/icons.js";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { favNotes, notes } = useSelector((state) => state.note);
  const [categories, setCategories] = useState([]);

  const [totalNote, setTotalNote] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalStarred, setTotalStarred] = useState(0);
  const [totalThisWeek, setTotalThisWeek] = useState(0);
  const [totalThisMonth, setTotalThisMonth] = useState(0);

  // Function to count categories
  const countCategories = () => {
    const uniqueCategories = notes.reduce((acc, note) => {
      if (!acc.includes(note.category)) {
        acc.push(note.category);
      }
      return acc;
    }, []);
    setCategories(uniqueCategories);
  };

  // Function to calculate notes created this week and month
  const calculateNotesByTime = () => {
    const currentDate = new Date();
    const startOfWeek = currentDate.setDate(
      currentDate.getDate() - currentDate.getDay()
    );
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const thisWeek = notes.filter(
      (note) => new Date(note.createdAt) >= startOfWeek
    );
    const thisMonth = notes.filter(
      (note) => new Date(note.createdAt) >= startOfMonth
    );

    setTotalThisWeek(thisWeek.length);
    setTotalThisMonth(thisMonth.length);
  };

  useEffect(() => {
    setTotalNote(notes.length);
    setTotalStarred(favNotes.length);
    setTotalCategories(categories.length);
    calculateNotesByTime();
  }, [user, notes, favNotes, categories]);

  useEffect(() => {
    countCategories();
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
      noOfNotes: totalCategories,
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
      noOfNotes: totalThisWeek,
    },
    {
      icon: <SlCalender className="text-xl text-green-500" />,
      title: "Created This month (30 days)",
      bgColor: "bg-green-500/20",
      borderColor: "border-l-green-500",
      noOfNotes: totalThisMonth,
    },
  ];

  return (
    <div className="w-full my-5 p-3">
      {/*  Dashboard title */}
      <div className="page-title">
        <h3 className="title text-3xl font-semibold">Dashboard</h3>
        <p className="desc text-sm text-gray-600 italic ">
          Welcome back,
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
          <NavLink to={"/addNote"}>
            <button className="w-full flex items-center gap-4 bg-blue-500/20 px-4 p-2.5 rounded-md hover:cursor-pointer hover:bg-blue-500/30 transition duration-200 shadow">
              <div className="icon">
                <FaPlus className="text-lg text-blue-500" />
              </div>
              <div className="action">Create New Note</div>
            </button>
          </NavLink>
          <NavLink to={"/allNotes"}>
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
  );
};

export default Dashboard;
