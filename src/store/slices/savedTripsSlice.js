import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";

// --- Async Thunks ---

export const saveTrip = createAsyncThunk(
  "savedTrips/save",
  async ({ tripName, config, itinerary }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const ref = doc(collection(db, "trips"));
      const tripData = {
        tripId: ref.id,
        ownerId: auth.uid,
        name: tripName,
        config,
        itinerary,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "saved",
        access: {},
        publicLinkEnabled: false,
      };
      await setDoc(ref, tripData);
      return { tripId: ref.id, name: tripName, config, itinerary };
    } catch (err) {
      return rejectWithValue(err.message ?? "Failed to save trip");
    }
  },
);

export const loadSavedTrips = createAsyncThunk(
  "savedTrips/load",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const q = query(
        collection(db, "trips"),
        where("ownerId", "==", auth.uid),
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => d.data());
    } catch (err) {
      return rejectWithValue(err.message ?? "Failed to load saved trips");
    }
  },
);

export const deleteTrip = createAsyncThunk(
  "savedTrips/delete",
  async (tripId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "trips", tripId));
      return tripId;
    } catch (err) {
      return rejectWithValue(err.message ?? "Failed to delete trip");
    }
  },
);

// --- Initial State ---

const initialState = {
  trips: [], // Trip summary objects
};

// --- Slice ---

const savedTripsSlice = createSlice({
  name: "savedTrips",
  initialState,
  reducers: {
    addTrip(state, action) {
      state.trips.push(action.payload);
    },
    removeTrip(state, action) {
      const tripId = action.payload;
      state.trips = state.trips.filter((t) => t.tripId !== tripId);
    },
    setTrips(state, action) {
      state.trips = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveTrip.fulfilled, (state, action) => {
        state.trips.push(action.payload);
      })
      .addCase(loadSavedTrips.fulfilled, (state, action) => {
        state.trips = action.payload;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.trips = state.trips.filter((t) => t.tripId !== action.payload);
      });
  },
});

export const { addTrip, removeTrip, setTrips } = savedTripsSlice.actions;
export default savedTripsSlice.reducer;
