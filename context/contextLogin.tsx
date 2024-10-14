import { SignInProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import { alertaSubmit } from "@/utils/altert";
import { ReducerApp } from "./Reducer/reducer";
import { useMutation, useQueryClient } from "react-query";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { logoutRequest, SignInRequest } from "@/services/session";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";

const ContextRefac = createContext<any>(null);

export const InfoContextRefac = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const { mutate: Login } = useMutation(SignInRequest);
    const { mutate: cerrarSesion } = useMutation(logoutRequest);
    const [state, dispatch] = useReducer(ReducerApp, { user: null, });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const sessionDuration = 2 * 60 * 60 * 1000; // 2 horas en milisegundos

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        const usuario = userJson ? JSON.parse(userJson) : null;
        const lastActivityStr = localStorage.getItem("lastActivity");
        const lastActivity = lastActivityStr ? parseInt(lastActivityStr, 10) : null;
        const currentTime = new Date().getTime();
        if (usuario) {
            dispatch({ type: "SET_USER", payload: usuario });
        }
        if (lastActivity && currentTime - lastActivity > sessionDuration) {
            logout();
        }
        const timer = setInterval(() => {
            const newCurrentTime = new Date().getTime();
            if (lastActivity && newCurrentTime - lastActivity > sessionDuration) {
                logout();
            }
        }, 9000);
        return () => {
            clearInterval(timer);
        };
    }, [dispatch]);

    const SignIn = ({ email, password, setErrorEmail, setErrorPassword, setMessageErrorEmail, setMessageErrorPassword }: SignInProps) => {
        dispatch({ type: "SET_LOGIN_ERROR", payload: { status: false, message: "" } });
        setIsLoading(true)
        Login({ email, password }, {
            onSuccess: (data: any) => {
                localStorage.setItem("user", JSON.stringify(data?.data.payload));
                dispatch({ type: "SET_USER", payload: data?.data.payload });
                localStorage.setItem("lastActivity", new Date().getTime().toString());
                queryClient.invalidateQueries(["login"]);
                router.push("/");
                setIsLoading(false)
                alertaSubmit(true, data.data.message);
                setErrorEmail(false);
                setErrorPassword(false)
            },
            onError: (error: any) => {
                const errorMessage = error?.response?.data?.message || error.message || "Ocurrió un error";
                setIsLoading(false)
                alertaSubmit(false, errorMessage);
                dispatch({ type: "SET_LOGIN_ERROR", payload: { status: true, message: error } });
                if (errorMessage === 'Debes ingresar un email' || errorMessage.includes('El email')) {
                    setErrorEmail(true);
                    setMessageErrorEmail(errorMessage);
                }
                if (errorMessage === 'Debes ingresar una contraseña' || errorMessage === 'la contraseña es incorrecta') {
                    setErrorPassword(true)
                    setMessageErrorPassword(errorMessage)
                }
            },
        }
        );
    };

    const logout = () => {
        cerrarSesion();
        router.push("/login");
        setTimeout(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("lastActivity");
            dispatch({ type: "SET_USER", payload: null });
            dispatch({ type: "LOGOUT" });
            window.location.reload();
        }, 400);
    };

    return (
        <>
            <ContextRefac.Provider value={{ state, dispatch, SignIn, logout }}>
                {children}
            </ContextRefac.Provider>
            {isLoading && <LoadingScreen />}
        </>
    );
};

export default ContextRefac;