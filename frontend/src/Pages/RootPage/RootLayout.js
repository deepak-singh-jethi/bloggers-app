//root page
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../../Components/MainNav/MainNav";
import Footer from "../../Components/Footer/Footer";
import { useRouteLoaderData } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../../Store/BlogsAction";
import blogsActions from "../../Store/Blogs";

function RootLayout() {
  const dispatch = useDispatch();
  const data = useRouteLoaderData("blogs");

  const { blog } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(blogsActions.addBlog(data));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(getAllBlog());
  }, [blog, dispatch]);

  return (
    <>
      <MainNav />
      <main className="sm:pt-16 pt-18 mt-16 sm:mt-1">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default RootLayout;
