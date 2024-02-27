// src/MyBlog.js
import React from "react";
import { Link } from "react-router-dom";

function MyBlog({ blogs, username }) {
  // Filter blogs based on the provided username and sort by date (newest first)
  const filteredBlogs = blogs
    .filter((blog) => blog.author === username)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const userProfile = {
    image: "https://dummyimage.com/100x100",
    posts: filteredBlogs.length,
    likes: "OOO",
    impressions: "OOO",
  };

  return (
    <div className="container mx-auto p-8 my-blog-area">
      {/* User Profile Card */}
      <div className="bg-white p-6 rounded-md shadow-xl border-black mb-8 w-3/4 mx-auto">
        <div className="flex items-center justify-center mb-4">
          <img
            src={userProfile.image}
            alt={username}
            className="w-20 h-20 object-cover rounded-full"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">{username}</h2>
          <p className="text-gray-600 mb-2">
            Posts: {userProfile.posts} | Likes: {userProfile.likes} |
            Impressions: {userProfile.impressions}
          </p>
        </div>
      </div>

      {/* Blogs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
            className="bg-white p-6 rounded-md shadow-xl border-black">
            <img
              src={blog.imageURL}
              alt={blog.heading}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{blog.heading}</h3>
              <p className="text-gray-600">{blog.content.slice(0, 150)}...</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              {/* Likes and Impressions */}
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v-6h-2v6zm0-8h2V7h-2v1z"
                  />
                </svg>
                <span className="text-gray-600">{blog.likes || 0} Likes</span>
              </div>
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 6L9 17l-5-5"
                  />
                </svg>
                <span className="text-gray-600">
                  {blog.impressions || 0} Impressions
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {/* Edit and Delete Buttons */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none w-2/3 my-5">
                Edit
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyBlog;
