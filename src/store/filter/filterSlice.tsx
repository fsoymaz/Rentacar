// src/store/filter/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number | null;
}

const initialState: FilterState = {
  category: '',
  minPrice: 0,
  maxPrice: null,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
   
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
   
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | null>) => {
      state.maxPrice = action.payload;
    },
    logoutFilter: (state) => {
      state.category = '';
      state.minPrice = 0;
      state.maxPrice = null;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const filterReducer = filterSlice.reducer;
export const {setCategory, setMinPrice, setMaxPrice, logoutFilter } = filterSlice.actions;
