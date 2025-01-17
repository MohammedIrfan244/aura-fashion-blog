import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};


const authSlice = createSlice({
  name: "currentUser",
  initialState: INITIAL_STATE,
  reducers: {}
});


export default authSlice.reducer;