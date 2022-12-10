import { createSlice } from "@reduxjs/toolkit";
import { addUser, usersAll, getUser, loginUser } from "./authApi";

const initialState = {
  users:[],
  user: {}
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    
    builder.addCase(usersAll.fulfilled, (state, action) => {
      console.log(action.payload);
      state.users = action.payload.users;
    })
  },
});

export default authSlice.reducer;
