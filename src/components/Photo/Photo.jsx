import React from "react";

export default function Photo({ src, description, user }) {
  return (
    <div className="w-[200px] relative overflow-hidden  hover:cursor-pointer">
      <img
        src={src || ""}
        alt={description || ""}
        className="w-full h-full rounded-[24px] transition-transform duration-300 ease-in-out transform hover:scale-110"
      ></img>
      <p className="absolute inset-x-0 bottom-0 text-center text-white bg-black bg-opacity-50 p-2 rounded-b-[24px]">
        {user?.name || ""}
      </p>
    </div>
  );
}
