import {
  ICategoryDropdown,
  IProduct,
  ISubCategoryDropdown,
} from "@/types/products";
import { IDynamicData } from "@/types/table";
import { createSlice } from "@reduxjs/toolkit";

type HomeState = {
  type: string;
  refetch: boolean;
  dynamicData: IDynamicData;
  dynamicTableData: IProduct[] | any[];
  singleData: IProduct | any;
  categoryDropdown: ICategoryDropdown[];
  subCategoryDropdown: ISubCategoryDropdown[];
  invoiceData: any[];
};

const initialState = {
  type: "",
  refetch: false,
  dynamicData: {} as IDynamicData,
  dynamicTableData: [],
  singleData: {} as any,
  categoryDropdown: [],
  subCategoryDropdown: [],
  invoiceData: [],
} as HomeState;

export const table = createSlice({
  name: "table",
  initialState,
  reducers: {
   
    setDynamicData: (state, action) => {
      state.dynamicData = action.payload;
    },
    setDynamicTableData: (state, action) => {
      state.dynamicTableData = action.payload;
    },
    setSingleData: (state, action) => {
      state.singleData = action.payload;
    },
    setCategoryDropdown: (state, action) => {
      state.categoryDropdown = action.payload;
    },
    setSubCategoryDropdown: (state, action) => {
      state.subCategoryDropdown = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
  },
});

export const {
  setType,
  setRefetch,
  setDynamicData,
  setDynamicTableData,
  setSingleData,
  setCategoryDropdown,
  setSubCategoryDropdown,
  setInvoiceData,
} = table.actions;
export default table.reducer;
