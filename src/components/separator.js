import React from "react";

const Separator = ({ className = "" }) => {
  return <div className={`min-h-[1px] w-full bg-black ${className}`}></div>;
};

export default Separator;
