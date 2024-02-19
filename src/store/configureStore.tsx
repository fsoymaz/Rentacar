import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./user/userSlice";
import { storeState, loadState } from "./user/storage"; // storeState ve loadState fonksiyonlarını import edin
import { rentalSlice } from "./rental/rentalSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  rental: rentalSlice.reducer,
});

const initialState = {
  auth: loadState("auth", authSlice.getInitialState), // auth state'ini local storage'dan yükle
  rental: loadState("rental", rentalSlice.getInitialState), // rental state'ini local storage'dan yükle
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState, // preloadedState'i initialState olarak ayarla
});

store.subscribe(() => {
  storeState("auth", store.getState().auth); // auth state'ini local storage'a kaydet
  storeState("rental", store.getState().rental); // rental state'ini local storage'a kaydet
});

export type RootState = ReturnType<typeof rootReducer>;