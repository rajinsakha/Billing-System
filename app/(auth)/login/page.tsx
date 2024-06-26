import AuthenticationForm from '@/components/forms/AuthenticationForm'
import Image from 'next/image'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
     <AuthenticationForm />
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default LoginPage