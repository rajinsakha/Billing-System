import { ISidebar } from "@/types/dashboard";
import {  Banknote, Boxes, HomeIcon, Import, Package, ReceiptText, } from 'lucide-react'

export const sidebarlist:ISidebar[] = [
    {
        title:"Dashboard",
        href:"/",
        Icon: HomeIcon 
    },
    {
        title:"Inventory",
        href:"/inventory",
        Icon: Boxes
    },

    {
        title:"Products",
        href:"/products",
        Icon: Package
    },
    {
        title:"Invoices",
        href:"/invoices",
        Icon: ReceiptText
    },
    {
        title:"Transactions",
        href:"/transactions",
        Icon: Banknote
    },
    {
        title:"Imports",
        href:"/import",
        Icon: Import
    },
    

]