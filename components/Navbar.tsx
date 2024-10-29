"use client"
import React from "react";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { Package2, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import SearchBox from "./searchBox";
import { usePathname } from "next/navigation";
import { FaFileInvoice } from "react-icons/fa";

const Navbar = () => {

  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex h-14 items-center justify-between  bg-muted fixed top-0 z-50 w-full py-4 px-4 lg:h-[60px] lg:px-6 overflow-hidden">
      <MobileNav />

      <div className="flex gap-4 h-14 items-center border-b lg:h-[60px] max-sm:hidden">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FaFileInvoice className="h-7 w-7 text-primary" />
          <span className="text-xl text-primary font-semibold">Billing System</span>
        </Link>
      </div>

    

      <div className="relative">
        {pathname !== '/invoices' && pathname !== "/"   && <SearchBox />}
      </div>

      <div>

      </div>
    </div>
  );
};

export default Navbar;
