import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const authorizeSlice = createSlice({
  name: "toolkit",
  initialState: {
    user: null as string | null,
    isAuthenticated: false,
  },
  reducers: {
    login(state, action: PayloadAction<string | null>) {
      state.user = action.payload;
    },
    authorize(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export default authorizeSlice.reducer;
export const { login, authorize } = authorizeSlice.actions;
