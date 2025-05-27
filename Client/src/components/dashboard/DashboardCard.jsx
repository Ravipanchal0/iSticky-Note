import React from "react";

const DashboardCard = ({ icon, bgColor, borderColor, title, noOfNotes }) => {
  return (
    <div
      className={`card flex gap-4 items-center  bg-white p-4 rounded-xl border-l-5 ${borderColor} shadow-md`}
    >
      <div
        className={`flex items-center justify-center ${bgColor} rounded-full size-10`}
      >
        {icon}
      </div>
      <div className="card-details">
        <h4 className="text-gray-700 text-sm">{title}</h4>
        <p className="text-lg">{noOfNotes}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
