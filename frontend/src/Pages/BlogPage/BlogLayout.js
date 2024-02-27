//show all blogs and suggestion
import React from "react";
import { json } from "react-router";
import Blogs from "../../Components/BlogArea/Blogs";
import { useSelector } from "react-redux";

function BlogLayout() {
  const { blogs } = useSelector((state) => state.blogs);

  return (
    <div
      className="bg-fixed"
      style={{
        background: `URL("https://source.unsplash.com/E8Ufcyxz514/2400x1823")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <Blogs blogs={blogs} />
    </div>
  );
}

export default BlogLayout;

export async function blogslodaer() {
  const response = await fetch("http://localhost:3000/vlogs");
  if (!response.ok) {
    throw json({ message: "Can Not fetch Blogs" }, { status: 500 });
  }
  return response;
}
