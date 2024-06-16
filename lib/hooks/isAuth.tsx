"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCheckToken from "./useCheckToken";

export default function isAuth(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const { loading, isAuthenticated } = useCheckToken();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/login");
      }
    }, [loading, isAuthenticated, router]);

    if (loading) {
      return "Loading...";
    }

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    return null; 
  };
}
