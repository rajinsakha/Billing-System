"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter} from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetPassword } from "@/api/auth/forgot-password";



const formSchema = z.object({
  email:z.string(),
    new_password:z.string(),
    confirm_password: z.string(),
  }).refine(
    (values) => {
      return values.new_password === values.confirm_password;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

type NewPasswordFormValue = z.infer<typeof formSchema>;

export default function NewPasswordForm() {
  
  const {email} = useAppSelector((state)=>state.authReducer);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
email:email,
    new_password:"",
    confirm_password:""
  };
  const form = useForm<NewPasswordFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: NewPasswordFormValue) => {
    
    try {
      const res = await resetPassword(data);

      if(res.status === 200){
   
      router.push('/login');

      }else{
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Invalid Credentials",
        });
      }
    } catch (err) {
      
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
           <div className="grid w-[350px] gap-6">
        
              <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter new password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Re-enter password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <div className="pt-8">
            <Button
              disabled={loading}
              className="ml-auto w-full  h-12"
              type="submit"
            >
            RESET PASSWORD
            </Button>
          </div>
          </div>
        </form>
      </Form>
    </>
  );
}
