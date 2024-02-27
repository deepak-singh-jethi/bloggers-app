// Home.js

import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import HeadingCard from "./HeadingCard";
import ExploreCard from "./ExploreCard";
import Carousel from "../Carousel/Carousel";

import { useSelector } from "react-redux";

const Home = () => {
  const { blogs } = useSelector((state) => state.blogs);

  return (
    <div className="text-center bg-transparent text-gray-800 ">
      <HeadingCard
        url1="https://source.unsplash.com/E8Ufcyxz514/2400x1823"
        heading1="Welcome to Bloggers"
        heading1Style="sm:text-[70px] text-[30px]"
        heading2="Share your thoughts and ideas with other."
        height="sm:h-[60vh] h-[40vh] min-h-[50vh]"
      />
      <div className="h-[40px] bg-slate-100 w-full"></div>

      {/* vlogs */}
      <ExploreCard
        url1="https://images.pexels.com/photos/91413/pexels-photo-91413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        url2="https://images.unsplash.com/photo-1619963258837-b83f3406cfcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        heading1="Explore"
        heading2="Start reading"
        content1="Explore insightful articles and discover a world of knowledge."
        btnText="Blogs"
      />

      {/* Studio*/}
      <div className="h-[40px] bg-slate-100 w-full"></div>
      <HeadingCard
        url1="https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        heading1="Unlock Your Creativity in the Studio"
        heading1Style="sm:text-[40px] text-[20px]"
        height="sm:h-[45vh] h-[35vh] min-h-[45vh]">
        {/* Button and Additional Info */}

        <p className="my-8 text-slate-900 text-2xl font-bold">Join us now!</p>
        <Link
          to="studio"
          className="px-10 py-5 bg-sky-400 text-white hover:bg-blue-500 rounded-lg mt-6">
          Check Studio
        </Link>
      </HeadingCard>
      <div className=" bg-slate-100 w-full"></div>
      <div className="m-12">
        <h1 className="text-center sm:text-[40px] text-[26px] font-extrabold mb-3 text-blue-600">
          Latest Blogs
        </h1>
        <Carousel blogs={blogs}></Carousel>
      </div>
    </div>
  );
};

export default Home;
