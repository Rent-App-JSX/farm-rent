import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Redux/propertySlice";
import propertiesReducer from "./slices/propertiesSlice";
import bookingsReducer from "./slices/bookingsSlice";
import analyticsReducer from "./slices/analyticsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    properties: propertiesReducer,
    bookings: bookingsReducer,
    analytics: analyticsReducer,
  },
});

export default store;
