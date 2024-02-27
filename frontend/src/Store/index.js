import { configureStore } from "@reduxjs/toolkit";
import { blogSlice } from "./Blog";
import { blogsSlice } from "./Blogs";
import { userSlice } from "./user";

const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    blogs: blogsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
