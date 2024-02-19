// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loadAuthState } from './storage';
import { setToken } from '../../utils/Interceptors';


export const authSlice =createSlice({
  name:'auth',
  initialState: loadAuthState(), 
 
reducers: {
  loginSuccess: (state, action) => {
    state.id = action.payload.id;
    state.email =action.payload.sub;
    state.username = action.payload.username;
    state.role= action.payload.role[0].authority;
    state.isAuthenticated = true;
  },
  logoutSuccess: (state) => {
    state.id = 0;
    state.role =  " ";
    state.email =" ";
    state.username = " ";
    setToken()
    state.isAuthenticated = false;
  },
},



  })



export const{ loginSuccess,logoutSuccess}=authSlice.actions;


