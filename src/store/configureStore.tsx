import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./user/userSlice";
import { rentalSlice } from "./rental/rentalSlice";
import { loadState, storeState } from "./user/storage";

const preloadedState = {
  auth: loadState("auth", authSlice.getInitialState()),
  rental: loadState("rental", rentalSlice.getInitialState()),
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  rental: rentalSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  storeState("auth", store.getState().auth);
  storeState("rental", store.getState().rental);
});

export type RootState = ReturnType<typeof rootReducer>;
