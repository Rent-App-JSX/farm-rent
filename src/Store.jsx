import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Redux/propertySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});