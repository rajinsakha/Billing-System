import { cache } from "react";
import axios from "axios";
import { baseURL } from "../axiosInstance";
import { IGenerateCode, IResetPassword, IVerifyCode } from "@/types/auth";

export const revalidate = 3600; // revalidate the data at most every hour

export const resetPassword = cache(
  async ( data: IResetPassword) => {

    const response = await axios.post(
      `${baseURL}dashboard/reset-password/`,
      data,
    );
    return response;
  }
);

export const generatePassword = cache(async (data: IGenerateCode) => {  
  const response = await axios.post(`${baseURL}dashboard/forgot-password/generate/
`, data,  {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});
  return response;
});

export const verifyCode = cache(async (data: IVerifyCode) => {
  const response = await axios.post(`${baseURL}dashboard/forgot-password/verify/`, data);

  return response;
});
