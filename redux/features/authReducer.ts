import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HomeState = {
  token: string;
  category: string;
};

const initialState = {
  token: "",
  category: ''
} as HomeState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCategory:(state, action) => {
      state.category = action.payload;
    }
  },
});

export const { setToken, setCategory } = auth.actions;
export default auth.reducer;
