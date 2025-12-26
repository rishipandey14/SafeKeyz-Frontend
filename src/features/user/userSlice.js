import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => ({ user: action.payload }),
    removeUser: () => null,
    resetUserState: () => null,
  },
});

export const { addUser, removeUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;
