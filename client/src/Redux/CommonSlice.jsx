import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  searchBar: false,
  popUpShow: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: INITIAL_STATE,
  reducers: {
    toggleSearchBar: (state) => {
      state.searchBar = !state.searchBar;
    },
    hideSearchBar: (state) => {
      state.searchBar = false;
    },
    popUpVisible: (state) => {
      state.popUpShow = true;
    },
    popUpHide: (state) => {
      state.popUpShow = false;
    },
  },
});

export const { toggleSearchBar, hideSearchBar, popUpVisible, popUpHide } =
  commonSlice.actions;
export default commonSlice.reducer;
