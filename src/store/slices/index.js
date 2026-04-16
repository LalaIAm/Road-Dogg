// Redux slice exports
export { default as authReducer, setUser, clearUser } from "./authSlice";
export {
  default as tripConfigReducer,
  setOrigin,
  setDestination,
  setDates,
  togglePreference,
  addCustomPreference,
  removeCustomPreference,
  setPacing,
  setAccommodation,
  resetConfig,
  PRESET_PREFERENCES,
  PACING_PRESETS,
  ACCOMMODATION_PRESETS,
} from "./tripConfigSlice";
export {
  default as itineraryReducer,
  setItinerary,
  clearItinerary,
  removeStop,
  reorderStops,
  replaceStop,
  generateItinerary,
  generateAlternativeStop,
} from "./itinerarySlice";
export {
  default as savedTripsReducer,
  addTrip,
  removeTrip,
  setTrips,
  saveTrip,
  loadSavedTrips,
  deleteTrip,
} from "./savedTripsSlice";
export {
  default as uiReducer,
  setLoading,
  setError,
  clearError,
  openModal,
  closeModal,
} from "./uiSlice";
