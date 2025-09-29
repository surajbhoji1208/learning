import React from "react";

const Menuiteme = ({ Icon, title }) => {
  return (
    <button className="flex items-center space-x-4 px-3 py-2 rounded hover:bg-gray-200 w-full text-gray-700 font-medium transition-colors">
      <Icon />
      <span>{title}</span>
    </button>
  );
};

export default Menuiteme;
