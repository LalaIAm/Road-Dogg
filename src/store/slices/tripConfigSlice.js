import { createSlice } from "@reduxjs/toolkit";

export const PRESET_PREFERENCES = [
  "Scenic",
  "Historical",
  "Art",
  "Local Gems",
  "Off the Beaten Path",
  "Kid-Friendly",
  "Food & Drink",
  "Adventure",
  "Relaxation",
  "Nature",
  "Luxury",
  "Sports",
];

export const PACING_PRESETS = {
  Leisurely: 200,
  Moderate: 350,
  Aggressive: 500,
};

export const ACCOMMODATION_PRESETS = [
  "Nature",
  "Sports",
  "Spa",
  "Luxury",
  "History",
  "Family-Friendly",
];

const initialState = {
  origin: null, // { address, lat, lng }
  destination: null, // { address, lat, lng }
  startDate: null, // ISO date string
  endDate: null, // ISO date string
  preferences: [], // string[]
  pacing: {
    preset: "Moderate",
    maxMilesPerLeg: 350,
  },
  accommodation: {
    preferences: [],
    nightlyBudget: null,
    tripBudget: null,
  },
};

const tripConfigSlice = createSlice({
  name: "tripConfig",
  initialState,
  reducers: {
    setOrigin(state, action) {
      state.origin = action.payload; // { address, lat, lng }
    },
    setDestination(state, action) {
      state.destination = action.payload; // { address, lat, lng }
    },
    setDates(state, action) {
      const { startDate, endDate } = action.payload;
      state.startDate = startDate ?? null;
      state.endDate = endDate ?? null;
    },
    togglePreference(state, action) {
      const pref = action.payload;
      const idx = state.preferences.indexOf(pref);
      if (idx === -1) {
        state.preferences.push(pref);
      } else {
        state.preferences.splice(idx, 1);
      }
    },
    addCustomPreference(state, action) {
      const pref = action.payload;
      if (pref && !state.preferences.includes(pref)) {
        state.preferences.push(pref);
      }
    },
    removeCustomPreference(state, action) {
      const pref = action.payload;
      const idx = state.preferences.indexOf(pref);
      if (idx !== -1) {
        state.preferences.splice(idx, 1);
      }
    },
    setPacing(state, action) {
      const { preset, maxMilesPerLeg } = action.payload;
      state.pacing.preset = preset;
      state.pacing.maxMilesPerLeg =
        maxMilesPerLeg ?? PACING_PRESETS[preset] ?? state.pacing.maxMilesPerLeg;
    },
    setAccommodation(state, action) {
      const { preferences, nightlyBudget, tripBudget } = action.payload;
      if (preferences !== undefined)
        state.accommodation.preferences = preferences;
      if (nightlyBudget !== undefined)
        state.accommodation.nightlyBudget = nightlyBudget;
      if (tripBudget !== undefined) state.accommodation.tripBudget = tripBudget;
    },
    resetConfig() {
      return initialState;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setDates,
  togglePreference,
  addCustomPreference,
  removeCustomPreference,
  setPacing,
  setAccommodation,
  resetConfig,
} = tripConfigSlice.actions;

export default tripConfigSlice.reducer;
