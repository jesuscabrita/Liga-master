"use client";
import { useRouter } from "next/navigation";
import { ContextType } from "@/interfaces";
import { LoadingScreen } from "../Shared/LoadingScreen";
import { useContext, useEffect, useState } from "react";
import ContextRefac from "@/context/contextLogin";

export const SecurityAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return function SecurityWrapper(props: any) {
        const router = useRouter();
        const { state: { user } } = useContext(ContextRefac) as ContextType;
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            if (user?.role !== 'super_admin') {
                router.push('/not-found');
            } else {
                setIsLoading(false);
            }
        }, [user, router]);

        if (isLoading) {
            return <LoadingScreen />;
        }

        return <WrappedComponent {...props} />;
    };
};