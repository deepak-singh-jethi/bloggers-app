import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs = action.payload.vlogs;
      return state;
    },
  },
});

const blogsActions = blogsSlice.actions;
export default blogsActions;
