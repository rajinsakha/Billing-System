import AuthenticationForm from "@/components/forms/AuthenticationForm";
import Image from "next/image";
import React from "react";
import Hardware from "../../../public/Hardware.jpeg";
import LoginImage from "../../../public/LoginImage.jpg";
import { FaFileInvoice } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-slate-50">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FaFileInvoice className="size-4" />
            </div>
            Billing System
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthenticationForm />
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block relative">
        <Image
          src={Hardware}
          alt="Image"
          fill
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
