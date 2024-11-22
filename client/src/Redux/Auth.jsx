import {  createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};


const authSlice = createSlice({
  name: "currentUser",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;