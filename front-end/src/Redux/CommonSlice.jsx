import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  searchBar: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: INITIAL_STATE,
  reducers: {
    toggleSearchBar: (state) => {
      state.searchBar = !state.searchBar;
    },
    hideSearchBar:(state)=>{
        state.searchBar=false
    }
  },
});

export const {toggleSearchBar,hideSearchBar}=commonSlice.actions
export default commonSlice.reducer;
