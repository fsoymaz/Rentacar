import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
export interface RentalState {
  startDate: string;
  endDate: string;
  carId: number;
  locationId: number;
}

const initialRentalState: RentalState = {
  startDate: "",
  endDate: "",
  carId: 0,
  locationId: 0,
};



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
   
    logoutRental: (state) => {
      state.startDate = "";
      state.endDate= "";
      state.carId = 0;
      state.locationId = 0;
    },
  },
});

export const { handleStartDate, handleEndDate, handleCarId, logoutRental, handleLocationId } = rentalSlice.actions;

export const rentalReducer = rentalSlice.reducer;

export const selectRental = (state: RootState) => state.rental;
