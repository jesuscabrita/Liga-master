"use client";
import { useContext, useEffect, useState } from "react";
import { LoadingScreen } from "../Shared/LoadingScreen";
import { useRouter } from "next/navigation";
import ContextRefac from "@/context/contextLogin";
import { ContextType } from "@/interfaces";

export const SecurityAuth = (WrappedComponent: any) => {
    return function SecurityWrapper(props: any) {
        const router = useRouter();
        const { state: { user } } = useContext(ContextRefac) as ContextType;
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            if (!(user?.role === 'super_admin' || user?.role === 'admin')) {
                router.push('/not-found');
            } else {
                setIsLoading(false);
            }
        }, [user, router]);

        if (isLoading) {
            return (
                <LoadingScreen />
            );
        }
        return <WrappedComponent {...props} />;
    };
};