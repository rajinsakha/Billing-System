import React from 'react'
import { Input } from './input'

interface ICustomInput{
    label:string;
    handleChange: any;
    placeholder: string;
}

const CustomInput = ({label, handleChange, placeholder}:ICustomInput) => {
  
  return (
    <div className="relative">
    <Input
      type="number"
      placeholder={placeholder}
      min={0}
      max={100}
      onChange={handleChange}
      className=" lg:w-[290px] focus:border-2 focus:border-primary"
      
    />
    <p className="absolute -top-2 left-4 z-10 bg-white text-xs">
      {label}
    </p>
  </div>
  )
}

export default CustomInput