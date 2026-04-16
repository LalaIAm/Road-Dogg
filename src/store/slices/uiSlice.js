import { createSlice } from "@reduxjs/toolkit";
import { generateItinerary, generateAlternativeStop } from "./itinerarySlice";
import { saveTrip, loadSavedTrips, deleteTrip } from "./savedTripsSlice";

const initialState = {
  isGenerating: false,
  isSaving: false,
  isExporting: false,
  errors: {}, // keyed by domain, e.g. { generation: "...", saving: "..." }
  modal: {
    open: false,
    type: null, // e.g. "saveTrip", "auth", "share"
    props: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setError(state, action) {
      const { key, message } = action.payload;
      state.errors[key] = message;
    },
    clearError(state, action) {
      const key = action.payload;
      delete state.errors[key];
    },
    openModal(state, action) {
      const { type, props } = action.payload;
      state.modal.open = true;
      state.modal.type = type;
      state.modal.props = props ?? null;
    },
    closeModal(state) {
      state.modal.open = false;
      state.modal.type = null;
      state.modal.props = null;
    },
  },
  extraReducers(builder) {
    // generateItinerary
    builder
      .addCase(generateItinerary.pending, (state) => {
        state.isGenerating = true;
        delete state.errors.generation;
      })
      .addCase(generateItinerary.fulfilled, (state) => {
        state.isGenerating = false;
      })
      .addCase(generateItinerary.rejected, (state, action) => {
        state.isGenerating = false;
        state.errors.generation = action.payload ?? action.error.message;
      });

    // generateAlternativeStop
    builder
      .addCase(generateAlternativeStop.pending, (state) => {
        state.isGenerating = true;
        delete state.errors.alternativeStop;
      })
      .addCase(generateAlternativeStop.fulfilled, (state) => {
        state.isGenerating = false;
      })
      .addCase(generateAlternativeStop.rejected, (state, action) => {
        state.isGenerating = false;
        state.errors.alternativeStop = action.payload ?? action.error.message;
      });

    // saveTrip
    builder
      .addCase(saveTrip.pending, (state) => {
        state.isSaving = true;
        delete state.errors.saving;
      })
      .addCase(saveTrip.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(saveTrip.rejected, (state, action) => {
        state.isSaving = false;
        state.errors.saving = action.payload ?? action.error.message;
      });

    // loadSavedTrips
    builder
      .addCase(loadSavedTrips.pending, (state) => {
        delete state.errors.loadTrips;
      })
      .addCase(loadSavedTrips.rejected, (state, action) => {
        state.errors.loadTrips = action.payload ?? action.error.message;
      });

    // deleteTrip
    builder
      .addCase(deleteTrip.pending, (state) => {
        delete state.errors.deleteTrip;
      })
      .addCase(deleteTrip.rejected, (state, action) => {
        state.errors.deleteTrip = action.payload ?? action.error.message;
      });
  },
});

export const { setLoading, setError, clearError, openModal, closeModal } =
  uiSlice.actions;
export default uiSlice.reducer;
