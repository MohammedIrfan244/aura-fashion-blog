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

export const patchBoutiques = createAsyncThunk(
  "boutiques/patchBoutiques",
  async ({ url, id }, { getState }) => {
    try {
      const currBoutique = getState().boutiques?.boutiques?.find(
        (item) => item?.id === id
      );
      const response = await axios.patch(url, {collectionReview:currBoutique?.collectionReview});
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
    addComment:(state,action)=>{
      const {comment,boutiqueId}=action.payload
      const index=state.boutiques?.findIndex(item=>item?.id==boutiqueId)
      state.boutiques[index]?.collectionReview?.push(comment)
    }
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

export const {addComment}=boutiqueSlice.actions
export default boutiqueSlice.reducer;
