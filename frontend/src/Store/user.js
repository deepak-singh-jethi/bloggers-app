import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: undefined,
  token: undefined,
  message: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.username = localStorage.getItem("username") || undefined;
      state.token = localStorage.getItem("authToken") || undefined;
      state.message = action.payload.message || undefined;
    },

    logOut: (state) => {
      state.username = undefined;
      state.token = undefined;
      state.message = undefined;
      return state;
    },
  },
});

const useractions = userSlice.actions;
export default useractions;
