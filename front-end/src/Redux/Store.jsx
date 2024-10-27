import { configureStore } from "@reduxjs/toolkit";
import styles from './StyleSlice'
import boutiques from './BoutiqueSlice'


export const store=configureStore({
    reducer:{
        styles:styles,
        boutiques:boutiques
    }
})
