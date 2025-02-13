import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./Redux/wishlistSlice"; // Reducer الخاص بالـ Wishlist
import authReducer from "./Redux/authSlice";

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer, // Reducer الخاص بالـ Wishlist
    auth: authReducer,  // إضافة authReducer هنا
  },
});

export default store;