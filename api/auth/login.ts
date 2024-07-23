import { cache } from "react";
import axios from "axios";
import api, { baseURL } from "../axiosInstance";
import { AuthenticationFormValues } from "@/components/forms/AuthenticationForm";

export const revalidate = 3600;

export const userLogin = cache(async (data:AuthenticationFormValues) => {
  const response = await axios.post(`${baseURL}dashboard/login/`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
});


export const userLogout = cache(async (token:string) => {
  const response = await api.post(`dashboard/logout/`, token)
  return response;
});