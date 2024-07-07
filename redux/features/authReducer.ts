import { InvoiceData } from "@/types/products";
import { createSlice,} from "@reduxjs/toolkit";

type HomeState = {
  token: string;
  category: string;
  invoiceData: InvoiceData;
 pageNo: number;
};

const initialState = {
  token: "",
  category: '',
  invoiceData:{},
  pageNo: 1,
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
    },
    setInvoiceData:(state, action) =>{
      state.invoiceData = action.payload;
    },
    setPageNumber:(state, action) => {
      state.pageNo = action.payload;
    }
  },
});

export const { setToken, setCategory, setInvoiceData, setPageNumber } = auth.actions;
export default auth.reducer;
