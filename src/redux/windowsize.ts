import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const windowSlice = createSlice({
  name: "windowSize",
  initialState: {
    width: 1440,
  },
  reducers: {
    setWidth(state, action: PayloadAction<number>) {
      state.width = action.payload;
    },
  },
});

export default windowSlice.reducer;
export const { setWidth } = windowSlice.actions;
