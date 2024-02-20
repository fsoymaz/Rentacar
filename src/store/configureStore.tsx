import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./user/userSlice";
import { storeAuthState } from "./user/storage";
import { rentalSlice } from "./rental/rentalSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  rental: rentalSlice.reducer,
});


export const store = configureStore({

  reducer : rootReducer,
});

store.subscribe(()=>{
  storeAuthState(store.getState().auth)

})

export type RootState = ReturnType<typeof rootReducer>;