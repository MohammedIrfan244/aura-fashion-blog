import { configureStore } from "@reduxjs/toolkit";
import styles from "./StyleSlice";
import boutiques from "./BoutiqueSlice";
import users from "./UserSlice";

export const store = configureStore({
  reducer: {
    styles: styles,
    boutiques: boutiques,
    users: users,
  },
});
