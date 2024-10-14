"use client";
import { ContextType } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import ContextRefac from "@/context/contextLogin";

export const SecurityLogin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return function SecurityWrapper(props: P) {
        const { state: { user } } = useContext(ContextRefac) as ContextType;
        const router = useRouter();

        useEffect(() => {
            if (user) {
                router.push('/');
            }
        }, [user]); 

        if (user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};