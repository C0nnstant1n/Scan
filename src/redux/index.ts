import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorizeSlice from "./slices";

const rootReducer = combineReducers({
  toolkit: authorizeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
