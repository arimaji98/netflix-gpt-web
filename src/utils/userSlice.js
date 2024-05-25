import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addReducer: (state, action) => {
      return action.payload;
    },
    removeReducer: (state, action) => {
      return null;
    },
  },
});

export const { addReducer, removeReducer } = userSlice.actions;

export default userSlice.reducer;
