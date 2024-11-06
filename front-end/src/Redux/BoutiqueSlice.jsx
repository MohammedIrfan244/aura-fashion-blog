import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  boutiques: [],
  loading: false,
  error: null,
};

export const fetchBoutiques = createAsyncThunk(
  "boutiques/fetchBoutiques",
  async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log("Error while fetching boutiques ", err);
    }
  }
);

const boutiqueSlice = createSlice({
  name: "boutiques",
  initialState: INITIAL_STATE,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoutiques.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoutiques.fulfilled, (state, action) => {
        state.boutiques = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoutiques.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default boutiqueSlice.reducer;
