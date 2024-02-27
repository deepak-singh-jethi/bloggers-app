import React from "react";

function StudioCard({ url, heading, content, btnText }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200  rounded  p-2 sm:p-10">
      <div className="relative  opacity-80 hover:opacity-100 h-[50vh]  rounded-md shadow-lg sm:mx-14  mx-3">
        <img
          src={url}
          alt="Hero Image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col justify-center p-6 shadow-xl">
        <h2 className="text-4xl font-bold mb-4 text-blue-800">{heading}</h2>
        <p className="text-gray-700 text-lg mb-6">{content}</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 w-[50%]">
          {btnText}
        </button>
      </div>
    </div>
  );
}

export default StudioCard;
