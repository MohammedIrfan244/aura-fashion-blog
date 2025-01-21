import { configureStore } from "@reduxjs/toolkit";
import common from "./CommonSlice";
import currentUser from "./Auth";

export const store = configureStore({
  reducer: {
    common: common,
    currentUser: currentUser,
  },
});
