import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  reservations: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.reservations = action.payload.reservations;
    },

    setDashboardReservation: (state, action) => {
      state.reservations = action.payload;
    },

    setSignOutState: (state) => {
      state.name = null;
      state.email = null;
      state.reservations = null;
    },
  },
});

export const { setUserLoginDetails, setSignOutState, setDashboardReservation } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserReservations = (state) => state.user.reservations;

export default userSlice.reducer;
