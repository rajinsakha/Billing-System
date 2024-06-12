import { createSlice } from "@reduxjs/toolkit";

type HomeState = {
  type: string;
  refetch: boolean;
};

const initialState = {
  type: "",
  refetch:false,
} as HomeState;

export const table = createSlice({
  name: "table",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setRefetch:(state, action) =>{
      state.refetch = action.payload;
    }
  },
});

export const { setType, setRefetch } = table.actions;
export default table.reducer;
