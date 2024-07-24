export interface DashboardCardProps{
    title:string;
    amount:number;
    description:string;
    Icon:React.ElementType;
    moneyType?: boolean;
}

export interface ISidebar{
title:string;
href:string;
Icon:React.ElementType;
}

export interface IFilterDropdown<T> {
    placeholder: string;
    width: string;
    options: T[];
    handleChange?: any;
    defaultValue?: string;
 
  }
  
