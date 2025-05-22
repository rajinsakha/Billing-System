"use client";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { authenticationFormSchema } from "@/schemas/formSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "@/api/auth/login";
import { useAppDispatch } from "@/redux/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { setToken } from "@/redux/features/authReducer";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import ButtonLoader from "../ButtonLoader";

export type AuthenticationFormValues = z.infer<typeof authenticationFormSchema>;

const AuthenticationForm = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = new URLSearchParams(window.location.search);

  const demoEmail = searchParams.get("email") || "";
  const demoPassword = searchParams.get("password") || "";

  const form = useForm<AuthenticationFormValues>({
    resolver: zodResolver(authenticationFormSchema),
    defaultValues: {
      username: demoEmail,
      password: demoPassword,
    },
  });

  const onSubmit = async (data: AuthenticationFormValues) => {
    try {
      setLoading(true);
      const res = await userLogin(data);
      if (res.status === 200) {
        dispatch(setToken(res.data.token));
        toast({
          variant: "default",
          title: "Login Successful",
          description: `You have successfully logged in to the system.`,
          duration: 3000,
        });

        router.push("/");
      }

      if (res.status === 401) {
        toast({
          variant: "destructive",
          title: "Failed to Log In",
          description: `${res.data.error}`,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to Log In",
        description: `Error Occured: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder={"Enter your password"}
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute top-[10px] right-[10px]"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? (
                          <FaEye className="text-primary" size={20} />
                        ) : (
                          <FaEyeSlash className="text-primary" size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-xs hover:text-primary underline underline-offset-4"
            >
              Forgot your password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <ButtonLoader /> : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuthenticationForm;
