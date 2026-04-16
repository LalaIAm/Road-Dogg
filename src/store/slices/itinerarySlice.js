import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/config";

// --- Async Thunks ---

export const generateItinerary = createAsyncThunk(
  "itinerary/generate",
  async (tripConfig, { rejectWithValue }) => {
    try {
      const fn = httpsCallable(functions, "generateItinerary");
      const { data } = await fn(tripConfig);
      return data; // Itinerary
    } catch (err) {
      return rejectWithValue(err.message ?? "Failed to generate itinerary");
    }
  },
);

export const generateAlternativeStop = createAsyncThunk(
  "itinerary/generateAlternativeStop",
  async ({ stopId, preferenceTag, tripConfig }, { rejectWithValue }) => {
    try {
      const fn = httpsCallable(functions, "generateAlternativeStop");
      const { data } = await fn({ stopId, preferenceTag, tripConfig });
      return data; // Stop
    } catch (err) {
      return rejectWithValue(
        err.message ?? "Failed to generate alternative stop",
      );
    }
  },
);

// --- Helpers ---

function recalcLegTotals(leg) {
  leg.distanceMiles = leg.stops.reduce(
    (sum, s) => sum + (s.distanceFromPrevMiles ?? 0),
    0,
  );
  leg.driveTimeMinutes = leg.stops.reduce(
    (sum, s) => sum + (s.driveTimeFromPrevMinutes ?? 0),
    0,
  );
}

function recalcItineraryTotals(state) {
  if (!state.itinerary) return;
  state.itinerary.totalDistanceMiles = state.itinerary.legs.reduce(
    (sum, leg) => sum + (leg.distanceMiles ?? 0),
    0,
  );
  state.itinerary.totalDriveTimeMinutes = state.itinerary.legs.reduce(
    (sum, leg) => sum + (leg.driveTimeMinutes ?? 0),
    0,
  );
}

// --- Initial State ---

const initialState = {
  itinerary: null, // Itinerary | null
};

// --- Slice ---

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    setItinerary(state, action) {
      state.itinerary = action.payload;
    },
    clearItinerary(state) {
      state.itinerary = null;
    },
    removeStop(state, action) {
      const stopId = action.payload;
      if (!state.itinerary) return;
      for (const leg of state.itinerary.legs) {
        const idx = leg.stops.findIndex((s) => s.stopId === stopId);
        if (idx !== -1) {
          leg.stops.splice(idx, 1);
          recalcLegTotals(leg);
          break;
        }
      }
      recalcItineraryTotals(state);
    },
    reorderStops(state, action) {
      const { legIndex, sourceIndex, destinationIndex } = action.payload;
      if (!state.itinerary) return;
      const leg = state.itinerary.legs[legIndex];
      if (!leg) return;
      const [moved] = leg.stops.splice(sourceIndex, 1);
      leg.stops.splice(destinationIndex, 0, moved);
      recalcLegTotals(leg);
      recalcItineraryTotals(state);
    },
    replaceStop(state, action) {
      const { legIndex, stopId, newStop } = action.payload;
      if (!state.itinerary) return;
      const leg = state.itinerary.legs[legIndex];
      if (!leg) return;
      const idx = leg.stops.findIndex((s) => s.stopId === stopId);
      if (idx !== -1) {
        leg.stops[idx] = newStop;
        recalcLegTotals(leg);
        recalcItineraryTotals(state);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(generateItinerary.fulfilled, (state, action) => {
        state.itinerary = action.payload;
      })
      .addCase(generateAlternativeStop.fulfilled, (state, action) => {
        // The caller should dispatch replaceStop with the returned stop.
        // This case is a no-op in itinerarySlice; uiSlice handles loading state.
      });
  },
});

export const {
  setItinerary,
  clearItinerary,
  removeStop,
  reorderStops,
  replaceStop,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;
