"use client";
import ClientOnly from "./ClientOnly";
import { Navbar } from "../Layout/Navbar/Navbar";
import { InfoContextRefac } from "@/context/contextLogin";
import { QueryClient, QueryClientProvider } from "react-query";
import { InfoContextProvider } from "@/context/contextPrincipal";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useEffect } from "react";
import { Footer } from "../Layout/Footer/Footer";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const Providerlayout = ({ children }: { children: React.ReactNode; }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchInterval: 60 * 60000,
                refetchIntervalInBackground: true,
            },
        },
    });

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js")
                .then((registration) => {
                    console.log("Service Worker registrado con éxito:", registration);
                })
                .catch((error) => {
                    console.log("Registro de Service Worker fallido:", error);
                });
        }

        let deferredPrompt: BeforeInstallPromptEvent | null = null;
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            deferredPrompt = e as BeforeInstallPromptEvent;
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("Usuario aceptó instalar la PWA");
                } else {
                    console.log("Usuario rechazó instalar la PWA");
                }
                deferredPrompt = null;
            });
        };
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    return (
        <ClientOnly>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <QueryClientProvider client={queryClient}>
                    <InfoContextProvider>
                        <InfoContextRefac>
                            <Navbar />
                            {children}
                            <Footer />
                        </InfoContextRefac>
                    </InfoContextProvider>
                </QueryClientProvider>
            </LocalizationProvider>
        </ClientOnly>
    )
}