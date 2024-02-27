import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteBlogAction } from "../../Store/BlogsAction";
import { useDispatch } from "react-redux";

function Blog({ blog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs } = useSelector((state) => state.blogs);

  const slicedBlogs = blogs.slice(0, 5);
  const currentId = blog.id;

  const localStorageUsername = localStorage.getItem("username");

  const isAuthor = blog.author === localStorageUsername;

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) {
      return;
    } else {
      dispatch(deleteBlogAction(currentId));
      navigate("/studio");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center items-center mx-4 md:mx-20 my-8">
      {/* Blog content area */}
      <div className="bg-white shadow-md rounded-md p-6 md:w-2/4 w-full">
        <img
          src={blog.imageURL}
          alt={blog.heading}
          className="lg:w-2/3 w-full h-auto rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">{blog.heading}</h2>
        <div className="flex justify-between mx-1 mb-4">
          <p className="text-gray-700 font-semibold">{`Author: ${blog.author}`}</p>
          <p className="text-gray-700 font-semibold">{`${new Date(
            blog.createdAt
          ).toLocaleString()}`}</p>
        </div>
        <p className="text-gray-600 mb-2 text-justify">{blog.content}</p>
        {isAuthor && (
          <div className="flex justify-center gap-20 my-5 shadow-lg py-5">
            <Link to={`/studio/edit/${blog.id}`} className="w-full">
              <button className="bg-blue-500 text-white w-1/3 py-2 rounded-md hover:bg-blue-600">
                Edit
              </button>
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white w-1/3 py-2 rounded-md hover:bg-red-600">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Suggestion area */}
      <div className="md:w-1/3 bg-gray-100 rounded-md p-4">
        <h1 className="text-center text-2xl font-extrabold mb-4 text-blue-400">
          SUGGESTIONS
        </h1>
        {slicedBlogs &&
          slicedBlogs.map(
            (suggestedBlog) =>
              suggestedBlog.id !== currentId && (
                <Link
                  key={suggestedBlog.id}
                  to={`/blogs/${suggestedBlog.id}`}
                  className="bg-white shadow-md rounded-md p-4 mb-4 hover:bg-slate-300 transition duration-300 ease-in-out transform hover:scale-105 block">
                  <h2 className="text-lg font-semibold mb-2">
                    {suggestedBlog.heading}
                  </h2>
                  <p className="text-gray-600">{`${suggestedBlog.content.substring(
                    0,
                    78
                  )}...`}</p>
                </Link>
              )
          )}
      </div>
    </div>
  );
}

export default Blog;
