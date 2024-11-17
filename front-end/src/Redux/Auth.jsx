import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  likedStyles: JSON.parse(localStorage.getItem("currentUser"))?.liked || {},
};

export const patchUser = createAsyncThunk(
  "currentUser/patchUser",
  async (url, { getState }) => {
    const { likedStyles } = getState().currentUser;
    const response = await axios.patch(url, { liked: likedStyles });
    return response.data;
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
    addToLike: (state, action) => {
      if (state.currentUser) {
        state.likedStyles[action.payload] = true;
        state.currentUser.liked = { ...state.likedStyles };
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },
    removeLike: (state, action) => {
      if (state.currentUser) {
        delete state.likedStyles[action.payload];
        state.currentUser.liked = { ...state.likedStyles };
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(patchUser.fulfilled, (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    });
  },
});

export const { login, logout, addToLike, removeLike } = authSlice.actions;
export default authSlice.reducer;
