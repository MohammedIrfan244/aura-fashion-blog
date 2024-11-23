import { configureStore } from "@reduxjs/toolkit";
import styles from "./StyleSlice";
import boutiques from "./BoutiqueSlice";
// import users from "./UserSlice";
import common from './CommonSlice'
import currentUser from './Auth'

export const store = configureStore({
  reducer: {
    styles: styles,
    boutiques: boutiques,
    // users: users,
    common: common,
    currentUser:currentUser
  },
});
