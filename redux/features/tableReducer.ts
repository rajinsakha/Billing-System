import { IProduct } from "@/types/products";
import { IDynamicData } from "@/types/table";
import { createSlice } from "@reduxjs/toolkit";

type HomeState = {
  type: string;
  refetch: boolean;
  dynamicData: IDynamicData;
dynamicTableData: IProduct[];
  invoiceData: any[];
};

const initialState = {
  type: "",
  refetch:false,
  dynamicData:{} as IDynamicData,
  dynamicTableData:[],
  invoiceData:[]
} as HomeState;

export const table = createSlice({
  name: "table",
  initialState,
  reducers: {
    setDynamicData:(state, action)=>{
      state.dynamicData = action.payload;
    },
    setDynamicTableData:(state, action)=>{
      state.dynamicTableData = action.payload
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setRefetch:(state, action) =>{
      state.refetch = action.payload;
    },
    setInvoiceData:(state, action) =>{
      state.invoiceData = action.payload;
    }
  },
});

export const { setType, setRefetch, setDynamicData, setDynamicTableData, setInvoiceData } = table.actions;
export default table.reducer;
