import { InvoiceData } from "@/types/products";
import { createSlice } from "@reduxjs/toolkit";

type HomeState = {
  token: string;
  category: string;
  invoiceData: InvoiceData;
  pageNo: number;
  email:string;
  codeStatus: boolean;
  emailStatus: boolean;
  passwordStatus: boolean;
};

const initialState = {
  token: "",
  category: "",
  invoiceData: {},
  pageNo: 1,
  email:"",
  codeStatus: false,
  emailStatus: true,
  passwordStatus: false,
} as HomeState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNo = action.payload;
    },
    setEmailStatus: (state, action) => {
      state.emailStatus = action.payload;
    },
    setPasswordStatus: (state, action) => {
      state.passwordStatus = action.payload;
    },
    setCodeStatus: (state, action) => {
      state.codeStatus = action.payload;
    },
    setEmail:(state, action) => {
      state.email = action.payload;
    }
  },
});

export const {
  setToken,
  setCategory,
  setInvoiceData,
  setPageNumber,
  setEmail,
  setCodeStatus,
  setEmailStatus,
  setPasswordStatus,
} = auth.actions;
export default auth.reducer;
