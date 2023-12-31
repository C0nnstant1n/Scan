import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorizeSlice from "./authorizeSlice";
import { scanApi } from "./HistogramSevice";
import windowSlice from "./windowsize";

const rootReducer = combineReducers({
  toolkit: authorizeSlice,
  [scanApi.reducerPath]: scanApi.reducer,
  windowSize: windowSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(scanApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
