import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center justify-center hover:scale-105 hover:shadow-xl transition transform duration-300 w-full h-full">
      {children}
    </div>
  );
};

export default Card;
