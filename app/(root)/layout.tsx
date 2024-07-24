"use client"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import isAuth from "@/lib/hooks/isAuth";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <div className="p-5 w-full ">{children}</div>
      </div>
    </>
  );
};

export default isAuth(DashboardLayout);
