import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  email: null,
  displayName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const { uid, email, displayName } = action.payload;
      state.uid = uid ?? null;
      state.email = email ?? null;
      state.displayName = displayName ?? null;
    },
    clearUser(state) {
      state.uid = null;
      state.email = null;
      state.displayName = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
