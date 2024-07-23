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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { setCodeStatus, setEmail, setEmailStatus } from "@/redux/features/authReducer";
import { generatePassword } from "@/api/auth/forgot-password";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

type ForgetPasswordFormValue = z.infer<typeof formSchema>;

export default function ForgetPasswordForm() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: "",
  };
  const form = useForm<ForgetPasswordFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ForgetPasswordFormValue) => {
    try {
      const res = await generatePassword(data);

      if (res.status === 200) {
        dispatch(setEmailStatus(false));
        dispatch(setCodeStatus(true));
        dispatch(setEmail(data.email));
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data?.detail || "Please try again later",
      });
    }
  };

  return (
    <div className="w-full py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
         <div className="grid w-[350px] gap-6">
         <div className="grid gap-2">
              <p className="text-balance text-sm text-muted-foreground">
              Enter your Email address and we will send you a link to reset password
              </p>
            </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Email"}</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder={"Enter your email..."}
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
              {"Verify Email"}
            </Button>
          </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
