import React from "react";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { Package2, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import SearchBox from "./searchBox";

const Navbar = () => {
  return (
    <div className="flex h-14 items-center justify-between  bg-muted fixed top-0 z-50 w-full py-4 px-4 lg:h-[60px] lg:px-6 overflow-hidden">
      <MobileNav />

      <div className="flex gap-4 h-14 items-center border-b lg:h-[60px] ">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">Hardware Shop</span>
        </Link>
    
      </div>

    

      <div className="relative">
        <SearchBox />
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full sm:w-[300px] appearance-none bg-background pl-8 shadow-none"
        /> */}
      </div>

      <div>

      </div>
    </div>
  );
};

export default Navbar;
