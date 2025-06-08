import { IoCloseSharp, FaStar } from "../../assets/icons.js";

const Note = ({ title, content, category, isStarred, createdAt, onClose }) => {
  return (
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm p-5">
      <div className="bg-white p-6 rounded shadow-md max-w-xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 font-bold cursor-pointer"
        >
          <IoCloseSharp size={24} />
        </button>
        <div className="header w-full flex items-center gap-3">
          <h2 className="font-semibold text-xl">{title}</h2>
          <p className="category text-sm px-2 py-0.5 rounded-full bg-slate-400">
            {category}
          </p>
          {isStarred && <FaStar color="yellow" />}
        </div>
        <div className="content mt-5">
          <p className="text-gray-700 text-justify whitespace-pre-wrap">
            {content}
          </p>
          <p className="createDate text-xs mt-5">
            Create At : {createdAt.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Note;
