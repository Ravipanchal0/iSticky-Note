import React from "react";
import loaderImg from "../../assets/Loader.svg";

const Loader = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-100 flex justify-center items-center bg-black/30 backdrop-blur-xs">
      <img src={loaderImg} alt="Loading..." width={42} />
    </div>
  );
};

export default Loader;
