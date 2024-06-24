import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type HomeState = {
  searchQuery: string;
  criteria: any;
};

const initialState = {
  searchQuery: "",
  criteria: {},
} as HomeState;

export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCriteria: (state, action: PayloadAction<any>) => {
      state.criteria = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {setCriteria, setSearchQuery} = filter.actions;
export default filter.reducer;
