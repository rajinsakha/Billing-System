"use client";
import React from "react";

import { sidebarlist } from "@/constants/data";
import LinkComponent from "./LinkComponent";
import { Button } from "./ui/button";
import Logout from "./logout";


const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:flex sticky left-0 top-0 h-screen w-fit flex-col justify-between lg:w-[264px] pt-20">
      <div className="flex flex-1 flex-col gap-6 items-center">
        {sidebarlist.map((item, index) => (
          <LinkComponent
            key={index}
            title={item.title}
            href={item.href}
            Icon={item.Icon}
          />
        ))}
      </div>

   <div className="p-4" >
   <Logout />
    
   </div>
       
    </div>
  );
};

export default Sidebar;
