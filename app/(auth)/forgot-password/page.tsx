"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import Hardware from '../../../public/Hardware.jpeg'
import Image from "next/image";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { setCodeStatus, setEmailStatus, setPasswordStatus } from "@/redux/features/authReducer";
import { InputOTPForm } from "@/components/forms/InputOTPForm";
import NewPasswordForm from "@/components/forms/NewPasswordForm";

export default function ForgetPasswordPage() {
  const { emailStatus, codeStatus, passwordStatus } = useAppSelector(
    (state) => state.authReducer
  );
  

  console.log(emailStatus);
  console.log(codeStatus);
  console.log(passwordStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setEmailStatus(true));
    dispatch(setCodeStatus(false));
    dispatch(setPasswordStatus(false));
  }, [dispatch]);

  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen bg-slate-50">
      <div className="p-8 lg:p-16 h-full flex items-center flex-col">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 pt-16">
          <div className="flex items-center gap-6">
            <MoveLeft onClick={handleClick} className="cursor-pointer" />

            <h1 className="text-[28px] text-[#212121] font-normal tracking-tight">
              {emailStatus && "Forgot Password"}
              {codeStatus && "Verify Code"}
              {passwordStatus && "Change Password"}
            </h1>
          </div>
          {emailStatus && <ForgetPasswordForm />}
          {codeStatus && <InputOTPForm />}
          {passwordStatus && <NewPasswordForm />}
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src={Hardware}
          alt="Image"
          fill
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
