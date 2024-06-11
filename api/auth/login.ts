import { cache } from "react";
import axios from "axios";
import { baseURL } from "../axiosInstance";
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
