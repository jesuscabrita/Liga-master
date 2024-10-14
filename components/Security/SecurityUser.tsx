"use client";
import ContextRefac from "@/context/contextLogin";
import { ContextType } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export const SecurityUser = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return function SecurityWrapper(props: P) {
        const { state: { user } } = useContext(ContextRefac) as ContextType;
        const router = useRouter();

        useEffect(() => {
            if (!user) {
                router.push('/not-found');
            }
        }, [user, router]);

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};