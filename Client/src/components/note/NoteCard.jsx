import React from "react";

import {
  FaRegStar,
  FaStar,
  FaRegEdit,
  RiDeleteBinLine,
  FaRegBookmark,
  FaBookmark,
} from "../../assets/icons.js";

const NoteCard = (note) => {
  const { title, time, content, isStarred, isCompleted } = note.note;

  return (
    <div className="bg-gray-200/40 px-4 py-3 rounded-lg flex flex-col shadow-sm">
      <div className="title flex justify-between items-center">
        <h2 className="font-semibold text-lg -mb-1">{title}</h2>
        <div className="favorite">
          {isStarred ? (
            <FaStar className="text-yellow-500 text-xl hover:cursor-pointer" />
          ) : (
            <FaRegStar className="text-gray-500 hover:text-yellow-500 text-xl hover:cursor-pointer" />
          )}
        </div>
      </div>

      <span className="time text-sm text-gray-600 mb-2">{time}</span>
      <p className="content">
        {content?.length > 70 ? content.slice(0, 70) + "...see more" : content}
      </p>
      <div className="actions flex justify-between items-center mt-3">
        <div className="left">
          <div className="mark-as-completed">
            {isCompleted ? (
              <FaBookmark className="text-green-600 text-lg" />
            ) : (
              <FaRegBookmark className="text-gray-500 text-lg hover:cursor-pointer hover:text-green-600" />
            )}
          </div>
        </div>
        <div className="right gap-4 flex items-center">
          <button>
            <FaRegEdit className="text-gray-500 text-xl hover:cursor-pointer hover:text-blue-600" />
          </button>
          <button>
            <RiDeleteBinLine className="text-gray-500 text-xl hover:cursor-pointer hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
