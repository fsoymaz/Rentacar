import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export interface AuthState {
  id: number;
  username: string;
  role: string;
  isAuthenticated: boolean;
  email: string;
}

export interface RentalState {
  startDate: string;
  endDate: string;
  carId: number;
  locationId: number; // Değişiklik
}

const initialRentalState: RentalState = {
  startDate: "",
  endDate: "",
  carId: 0,
  locationId: 0, // Değişiklik
};

const initialState: AuthState = {
  id: 0,
  username: "",
  role: "",
  isAuthenticated: false,
  email: ""
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.id = 0;
      state.username = "";
	  state.email = "";
      state.role = "";
      state.isAuthenticated = false;
    },
  },
});

export const rentalSlice = createSlice({
  name: "rental",
  initialState: initialRentalState,
  reducers: {
    handleStartDate(state: RentalState, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    handleEndDate(state: RentalState, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    handleCarId(state: RentalState, action: PayloadAction<number>) {
      state.carId = action.payload;
    },
    handleLocationId(state: RentalState, action: PayloadAction<number>) {
      state.locationId = action.payload;
    },
   
    resetRentalState: (state) => {
      return initialRentalState;
    },
  },
});

export const { handleStartDate, handleEndDate, handleCarId, resetRentalState, handleLocationId } = rentalSlice.actions;
export const {  logoutSuccess } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const rentalReducer = rentalSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectRental = (state: RootState) => state.rental;
