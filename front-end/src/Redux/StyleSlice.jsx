import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  styles: [],
  loading: false,
  error: null,
};
export const fetchStyles = createAsyncThunk(
  "styles/fetchStyles",
  async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log("Error while fetching styles ", err);
    }
  }
);

export const patchStyle = createAsyncThunk(
  "styles/patchStyles",
  async ({ url, id }, { getState }) => {
    try {
      const currStyle = getState().styles?.styles?.find(
        (style) => style.id === id
      );
      const response = await axios.patch(url, { likes: currStyle?.likes });
      return response.data;
    } catch (err) {
      console.log("Error while patching styles ", err);
    }
  }
);

const styleSlice = createSlice({
  name: "styles",
  initialState: INITIAL_STATE,
  reducers: {
    likeIncrement: (state, action) => {
      const id = action.payload;
      const style = state.styles.find((style) => style.id === id);
      if (style) {
        style.likes += 1;
      }
    },
    likeDecrement: (state, action) => {
      const id = action.payload;
      const style = state.styles.find((style) => style.id === id);
      if (style) {
        style.likes -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStyles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStyles.fulfilled, (state, action) => {
        state.loading = false;
        state.styles = action.payload;
      })
      .addCase(fetchStyles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { likeIncrement, likeDecrement } = styleSlice.actions;
export default styleSlice.reducer;
