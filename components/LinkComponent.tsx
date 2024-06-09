"use client"
import { ISidebar } from '@/types/dashboard'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React from 'react'

const LinkComponent = ({title, href, Icon}:ISidebar) => {
    const pathname = usePathname();
   const isActive = pathname === href;
  return (
    <Link
    href={href}
    className={` flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-100 w-[200px] ${isActive && "bg-blue-100 text-primary"}`}
  >
    <Icon className="h-4 w-4"  />
    {title}
  </Link>
  )
}

export default LinkComponent