import React from "react";

const Container = ({ children }) => {
  return (
    <div className="w-full py-5 px-8 mx-auto box-border flex-1">{children}</div>
  );
};

export default Container;
