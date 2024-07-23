import AuthenticationForm from '@/components/forms/AuthenticationForm'
import Image from 'next/image'
import React from 'react'
import Hardware from '../../../public/Hardware.jpeg'

const LoginPage = () => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen bg-slate-50">
     <AuthenticationForm />
      <div className="hidden bg-muted lg:block relative">
        <Image
          src={Hardware}
          alt="Image"
          fill
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage