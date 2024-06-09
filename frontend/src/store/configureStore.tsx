import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./user/userSlice";
import { rentalSlice } from "./rental/rentalSlice";
import { loadState, storeState } from "./user/storage";
import { filterSlice } from "./filter/filterSlice";

const preloadedState = {
  auth: loadState("auth", authSlice.getInitialState()),
  rental: loadState("rental", rentalSlice.getInitialState()),
  filter: loadState("filter", filterSlice.getInitialState()),
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  rental: rentalSlice.reducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  storeState("auth", store.getState().auth);
  storeState("rental", store.getState().rental);
  storeState("filter", store.getState().filter);
});

export type RootState = ReturnType<typeof rootReducer>;
