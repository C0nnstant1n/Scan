import { createSlice } from "@reduxjs/toolkit";

const authorizeSlice = createSlice({
  name: "toolkit",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    authorize(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export default authorizeSlice.reducer;
export const { login, authorize } = authorizeSlice.actions;
