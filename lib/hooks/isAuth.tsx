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
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="loader"></div>
        </div>
      );
    }

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    return null;
  };
}
