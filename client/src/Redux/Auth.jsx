import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};

export const registerNewUser = createAsyncThunk(
  "users/registerNewUser",
  async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (err) {
      console.log("Error while registering new user ", err);
    }
  }
);

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