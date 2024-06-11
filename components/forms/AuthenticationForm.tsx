"use client"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'
import { authenticationFormSchema } from '@/schemas/formSchema'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userLogin } from '@/api/auth/login'
import { useAppDispatch } from '@/redux/hooks'


export type AuthenticationFormValues = z.infer<typeof authenticationFormSchema>;

const AuthenticationForm = () => {
 const dispatch = useAppDispatch();


const form = useForm<AuthenticationFormValues>({
        resolver: zodResolver(authenticationFormSchema),
        defaultValues:{
            username:"",
            password:""
        },
      });

    const onSubmit = async (data:AuthenticationFormValues)=>{
        try{
            const res = await userLogin(data);
            if(res.status === 200){
                console.log(res.data);
            }

        }catch(error){

        }
    }  

    
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        
        </div>
      
      </div>
    </div>
  </div>
  )
}

export default AuthenticationForm