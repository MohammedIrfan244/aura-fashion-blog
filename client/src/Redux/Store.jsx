import { configureStore } from "@reduxjs/toolkit";
import styles from "./StyleSlice";
import boutiques from "./BoutiqueSlice";
import common from './CommonSlice'
import currentUser from './Auth'

export const store = configureStore({
  reducer: {
    styles: styles,
    boutiques: boutiques,
    common: common,
    currentUser:currentUser
  },
});
