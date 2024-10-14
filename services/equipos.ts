import { api } from "./api";
import { ApiError } from "@/interfaces";

export const equiposGet = async () => {
    try {
        const { equipos } = await api.get('/api/liga').then(res => res.data)
        return equipos;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const equiposGetById = async (id: any) => {
    try {
        const equipos = await api.get(`/api/liga/${id}`).then(res => res.data)
        return equipos;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const equiposPost = async ({ form }: { form: any }) => {
    try {
        const data = await api.post('/api/liga', form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const equiposPut = async ({ form, id }: { form: any, id: any }) => {
    try {
        const data = await api.put(`/api/liga/${id}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const equiposEstadosPut = async ({ form, id }: { form: any, id: any }) => {
    try {
        const data = await api.put(`/api/liga/estado/${id}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const equiposDelete = async ({ id }: { id: any }) => {
    try {
        const data = await api.delete(`/api/liga/${id}`).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const resetEquiposJugador = async ({ equipoID }: { equipoID: any }) => {
    try {
        const data = await api.put(`/api/liga/reset/${equipoID}`).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}