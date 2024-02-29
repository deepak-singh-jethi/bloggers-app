import React from "react";
import Blog from "../../Components/BlogContent/Blog";
import { json, useLoaderData } from "react-router";

function BlogContent() {
  const { vlog } = useLoaderData();

  return <Blog blog={vlog}></Blog>;
}

export default BlogContent;

export async function BlogContentLoader({ request, params }) {
  const id = params.blogid;
  const response = await fetch("http://localhost:3000/vlogs/" + id);

  if (!response.ok) {
    throw json({ message: "Blog not found" }, { status: 404 });
  }

  return response;
}
