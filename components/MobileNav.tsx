import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
   Menu,
  Package2,
} from "lucide-react"; 
import { Button } from "./ui/button";

import { sidebarlist } from "@/constants/data";
import Link from "next/link";
import Logout from "./logout";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col justify-between">
        <nav className="grid gap-4 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
             <span className="text-[13px]">फुल्चोकी पाईप फिटिङ्ग सप्लायर्स</span>
          </Link>
          {sidebarlist.map((item, index) => (
            <Link
            key={index}
              href={item.href}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-primary text-muted-foreground hover:bg-blue-100 ${pathname === item.href && "bg-blue-100 text-primary"}`}
            >
              <item.Icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
  
        </nav>
        <Logout />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
