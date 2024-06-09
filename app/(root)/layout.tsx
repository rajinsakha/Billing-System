import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="p-5 w-full ">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
