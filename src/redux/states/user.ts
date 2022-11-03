import { User } from "@models/auth";

import { createSlice } from "@reduxjs/toolkit";

export const UserEmptyState: User = {
  uuid: "",
  name: "",
  lastName: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: UserEmptyState,
  reducers: {
    createUser: (state, action) => action.payload,
    modifyUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => UserEmptyState,
  },
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
