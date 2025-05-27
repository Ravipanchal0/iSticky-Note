import React from "react";
import LoaderGif from "../../assets/Loading.gif";

const Loader = () => {
  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black/30 flex justify-center items-center">
      <img src={LoaderGif} alt="Loading..." width={90} />
    </div>
  );
};

export default Loader;
