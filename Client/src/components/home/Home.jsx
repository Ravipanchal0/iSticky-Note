import Button from "../utilities/Button";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { authStatus, user } = useSelector((state) => state.auth);
  return (
    <div className="home w-full h-full flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold mb-3 text-center">
        Welcome to&nbsp;
        <span className="text-blue-500 italic">
          {user?.fullName || "iSticky Notes"}
        </span>
      </h1>
      <p className="text-lg text-gray-800">Your notes are just a click away!</p>
      <NavLink to="/login">
        <Button
          children="Get Started"
          className="mt-4 font-semibold cursor-pointer hover:bg-blue-800 duration-200 shadow-lg"
        />
      </NavLink>
    </div>
  );
};

export default Home;
