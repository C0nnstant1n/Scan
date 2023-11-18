import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorizeSlice from "./authorizeSlice";
import { histogramsApi } from "./HistogramSevice";

const rootReducer = combineReducers({
  toolkit: authorizeSlice,
  [histogramsApi.reducerPath]: histogramsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(histogramsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
