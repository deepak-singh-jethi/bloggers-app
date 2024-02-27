import React from "react";
import MyBlog from "../../../Components/Studio/MyBlog";
import { useSelector } from "react-redux";

function UserBlogLayout() {
  const { blogs } = useSelector((state) => state.blogs);
  const username = localStorage.getItem("username");

  return <MyBlog blogs={blogs} username={username}></MyBlog>;
}

export default UserBlogLayout;
