import { ApiError } from "@/interfaces";
import { api } from "./api";

export const SignInRequest = async ({ email, password }: { email: string; password: string }) => {
    try {
        const data = await api.post('api/user/login', { email, password })
        return data;
    }
    catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const logoutRequest = async () => {
    try {
        const data = await api.post('api/user/logout')
        return data;
    }
    catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const RegisterRequest = async ({ form }: { form: any }) => {
    try {
        const data = await api.post('api/user/register', form)
        return data;
    }
    catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const SolicitarContraseñaRequest = async ({ form }: { form: { email: string; } }) => {
    try {
        const data = await api.post('api/user/solicitar', form)
        return data;
    }
    catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const CambiarContraseñaRequest = async ({ form }: { form: { email: string; password: string; repeated_password: string } }) => {
    try {
        const data = await api.post('api/user/cambiar', form)
        return data;
    }
    catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}