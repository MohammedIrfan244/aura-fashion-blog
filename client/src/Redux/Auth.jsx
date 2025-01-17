import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};


const authSlice = createSlice({
  name: "currentUser",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  }
});

export const { logout , login } = authSlice.actions;
export default authSlice.reducer;