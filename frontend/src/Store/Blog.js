import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: {},
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog(state, action) {
      state.blog = {
        heading: action.payload.heading,
        content: action.payload.content,
        imageURL: action.payload.imageURL,
        category: action.payload.category,
      };
    },
    clearBlog(state) {
      return initialState;
    },
  },
});

const blogActions = blogSlice.actions;
export default blogActions;
