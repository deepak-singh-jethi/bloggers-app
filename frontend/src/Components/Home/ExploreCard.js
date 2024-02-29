import React, { memo } from "react";
import { Link } from "react-router-dom";

const ExploreCard = memo(function ExploreCard({
  url1,
  url2,
  heading1,
  heading2,
  content1,
  btnText,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#d8d6d4] max-h-[50vh] overflow-x-hidden  mx-2 sm:mx-5 overflow-y-scroll">
      {/* left side explore */}
      <Link
        to="blogs"
        className="py-8 max-h-[50vh] overflow-y-scroll sm:mx-14  mx-3">
        <div className="bg-[#4bafc8] p-6 rounded-md shadow-md mx-5 h-full">
          <div className="relative overflow-hidden rounded-md ">
            <img
              src={url1}
              alt="Card Image"
              className="w-full h-[200px] object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity hover:opacity-80 flex items-center justify-center">
              <p className="text-white font-bold text-2xl">{heading1}</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">{heading2}</h2>
            <p className="text-slate-100  text-sm sm:text-lg">{content1}</p>
          </div>
        </div>
      </Link>
      {/* right side explore */}
      <div
        className="py-8 parallax home-info-area min-h-[50vh] grow"
        style={{
          backgroundImage: `URL(${url2})`,
        }}>
        <Link
          to="blogs"
          className="px-12 py-6 rounded-lg text-xl font-bold bg-sky-700 text-white hover:bg-blue-500">
          {btnText}
        </Link>
      </div>
    </div>
  );
});

export default ExploreCard;
