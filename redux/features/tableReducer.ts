import { createSlice } from "@reduxjs/toolkit";

type HomeState = {
  type: string;
};

const initialState = {
  type: "",
};

export const table = createSlice({
  name: "table",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setType } = table.actions;
export default table.reducer;
