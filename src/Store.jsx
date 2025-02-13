import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./Redux/wishlistSlice"; // Reducer الخاص بالـ Wishlist

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer, // Reducer الخاص بالـ Wishlist
  },
});

export default store;