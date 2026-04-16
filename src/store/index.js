import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tripConfigReducer from "./slices/tripConfigSlice";
import itineraryReducer from "./slices/itinerarySlice";
import savedTripsReducer from "./slices/savedTripsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tripConfig: tripConfigReducer,
    itinerary: itineraryReducer,
    savedTrips: savedTripsReducer,
    ui: uiReducer,
  },
});
