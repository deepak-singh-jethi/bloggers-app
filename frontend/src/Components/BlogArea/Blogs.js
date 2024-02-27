import React from "react";
import { Link } from "react-router-dom";
import HeadingCard from "../Home/HeadingCard";

function Blogs({ blogs }) {
  return (
    <>
      <HeadingCard
        url1="https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg"
        heading1="Pure Thoughts"
        heading1Style="sm:text-[50px] text-[30px]"
        height="sm:h-[50vh] h-[40vh] min-h-[40vh]"
      />
      <div className="h-[40px] bg-slate-100 w-full"></div>
      <h1 className="text-center w-full  text-[30px] sm:text-[50px] font-bold text-yellow-200 mt-10">
        Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-9 md:mx-20 lg:m-40s pb-16 ">
        {blogs &&
          blogs.map((blog) => {
            return (
              <div
                key={blog.id}
                className="border-green-950 sm:p-6 p-4 rounded-lg shadow-2xl bg-white hover:bg-slate-200 hover:scale-105 blog-card">
                <div className="overflow-hidden h-56">
                  <img
                    src={blog.imageURL}
                    className="w-full h-full object-cover"
                    alt={blog.heading}></img>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">{blog.author}</p>
                </div>
                <div className="mt-2 overflow-hidden">
                  <h1 className="text-xl font-semibold">{blog.heading}</h1>
                  <p className="mt-2 text-gray-600 ">
                    {blog.content.substring(0, 78)}...
                  </p>
                </div>
                <div className="flex justify-between mx-2 my-2 items-center">
                  <Link to={`/blogs/${blog.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded mt-4 text-sm sm:text-lg">
                      Read More
                    </button>
                  </Link>
                  <p className="mt-5 text-blue-800 text-sm sm:text-xl py-1 sm:py-2 px-2 sm:px-4  bg-yellow-300 rounded-lg">
                    {blog.category}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Blogs;
