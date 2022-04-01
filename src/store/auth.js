// src/store/auth.js
import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

const tokenValidity = (jwtToken) => {
  /* This method will serve us to check if the expiration time for the jwt token if hes exists. */
  try {
    const { exp } = jwt_decode(jwtToken);
    // Refresh the token a minute early to avoid latency issues
    const expirationTime = (exp * 1000) - 60000;
    if (Date.now() >= expirationTime) {
      return false;
    }
    return true;
  }
  catch {
    return false;
  }
};

const initialAuthStateBuilder = () => {
  /* This method will setup the initialState for the auth slice in the redux */
  if (localStorage.getItem('token')) {
    if (tokenValidity(localStorage.getItem('token'))) {
      return {
        isAuthenticated: localStorage.getItem('token') ? true : false,
        userID: localStorage.getItem('userID') || null,
        gameProfileID: localStorage.getItem('gameProfileID') || null,
        token: localStorage.getItem("token") || null
      };
    }
    else {
      localStorage.clear();
      return {
        isAuthenticated: false,
        userID: null,
        gameProfileID: null,
        token: null
      };
    }
  }
  else {
    localStorage.clear();
    return {
      isAuthenticated: false,
      userID: null,
      gameProfileID: null,
      token: null
    };
  }
};

const initialAuthState = initialAuthStateBuilder();

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userID', action.payload.userID);
      localStorage.setItem('gameProfileID', action.payload.gameProfileID);
      state.isAuthenticated = true;
      state.userID = action.payload.userID;
      state.gameProfileID = action.payload.gameProfileID;
      state.token = action.payload.token;
    },
    logout(state) {
      localStorage.clear();
      state.isAuthenticated = false;
      state.userID = null;
      state.gameProfileID = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;