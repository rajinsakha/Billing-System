import { ISidebar } from "@/types/dashboard";
import {  BadgeDollarSign, Boxes, HomeIcon, LineChart, Package, ReceiptText, } from 'lucide-react'

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
        Icon: BadgeDollarSign
    },

]