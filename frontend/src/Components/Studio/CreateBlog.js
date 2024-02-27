import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveNewBlog } from "../../Store/BlogsAction";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //for edit blog
  const { blogid } = useParams();
  const { blogs } = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === blogid);
  console.log(blogid);
  //if blog is found, prefill the form

  const [blogData, setBlogData] = useState({
    heading: "",
    content: "",
    imageURL: "",
    category: "",
  });

  useEffect(() => {
    if (blog) {
      setBlogData({
        heading: blog.heading,
        content: blog.content,
        imageURL: blog.imageURL,
        category: blog.category,
      });
    }
  }, []);

  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (
      blogData.heading.trim() === "" ||
      blogData.content.trim() === "" ||
      blogData.imageURL.trim() === "" ||
      blogData.category.trim() === ""
    ) {
      setMessage("Please fill in all the fields");
      return;
    }
    if (!blogData.imageURL.startsWith("http")) {
      setMessage("Image URL must start with http or https");
      return;
    }
    setMessage(null);
    //if blogid is present means edit the blog else save new blog
    if (blogid) {
      dispatch(saveNewBlog({ ...blogData, id: blogid, method: "PUT" }));
      navigate("/studio");
    } else {
      dispatch(saveNewBlog({ ...blogData, method: "POST" }));
      navigate("/studio");
    }
  };

  const handleCancel = () => {
    navigate("/studio");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 create-blog-area">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {!blogid ? "Create Blog" : "Edit Blog"}
        </h1>

        {message && <p className="text-red-500 text-center">{message}</p>}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Heading
          </label>
          <input
            type="text"
            name="heading"
            value={blogData.heading}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleInputChange}
            className="w-full h-48 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="imageURL"
            value={blogData.imageURL}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={blogData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 focus:outline-none"
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
