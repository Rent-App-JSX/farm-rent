import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Redux/propertySlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;