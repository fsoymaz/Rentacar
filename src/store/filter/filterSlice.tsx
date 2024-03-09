// src/store/filter/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

interface FilterState {
  category: string;
  brandId: number | null;
  modelId: number | null;
  minPrice: number;
  maxPrice: number | null;
}

const initialState: FilterState = {
  category: '',
  brandId: 0,
  modelId: 0,
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
    setBrandId: (state, action: PayloadAction<number | null>) => {
      state.brandId = action.payload;
    },
    setModelId: (state, action: PayloadAction<number | null>) => {
      state.modelId = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | null>) => {
      state.maxPrice = action.payload;
    },
    logoutFilter: (state) => {
      state.category = '';
      state.brandId = 0;
      state.modelId = 0;
      state.minPrice = 0;
      state.maxPrice = null;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const filterReducer = filterSlice.reducer;
export const {setCategory, setBrandId, setModelId, setMinPrice, setMaxPrice, logoutFilter } = filterSlice.actions;
