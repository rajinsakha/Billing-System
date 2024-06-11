import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HomeState = {
  token: string;
};

const initialState = {
  token: "",
} as HomeState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = auth.actions;
export default auth.reducer;
