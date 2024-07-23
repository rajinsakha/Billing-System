"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";

import { toast } from "@/components/ui/use-toast";
import { userLogout } from "@/api/auth/login";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToken } from "@/redux/features/authReducer";

const Logout = () => {
  const { token } = useAppSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await userLogout(token);
      if (res.status === 200) {
        window.location.href = "/";
        dispatch(setToken(""));
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data?.detail || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <>
          <Button className="flex items-center gap-3 rounded-lg  py-2 text-muted-foreground transition-all bg-muted/40 hover:text-primary hover:bg-blue-100 w-[200px] justify-start">
            <LogOut size={24} className="max-sm:w-[20px]" />
            <p className="font-semibold text-sm sm:text-base">Logout</p>
          </Button>
        </>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="max-sm:text-left">
           Confirm Logout
          </DialogTitle>
        </DialogHeader>

        <p className="text-[13.4px] leading-[22px] pt-2">
         
          Are you sure you want to log out of your account?
        </p>
        <div className="flex justify-end pt-4 pb-2 gap-4">
          <DialogClose className="text-primary hover:text-red-800">
    Cancel
          </DialogClose>
          <Button
            className="bg-secondary text-textColor text-base font-semibold rounded-sm hover:bg-primary hover:text-white"
            onClick={handleClick}
          >
            {loading ? (
              <RotatingLines
                visible={true}
                width="20"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                strokeColor="white"
              />
            ) :   (
              "Logout"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
