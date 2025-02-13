import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Redux/propertySlice"; // Reducer الخاص بالسلة
import wishlistReducer from "./Redux/wishlistSlice"; // Reducer الخاص بالـ Wishlist

const store = configureStore({
  reducer: {
    cart: cartReducer, // Reducer الخاص بالسلة
    wishlist: wishlistReducer, // Reducer الخاص بالـ Wishlist
  },
});

export default store;