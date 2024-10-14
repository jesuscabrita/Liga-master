import { ApiError } from "@/interfaces";
import { api } from "./api";

export const delegadoPost = async ({ form, eid }: { form: any; eid: any }) => {
    try {
        const data = await api.post(`/api/liga/${eid}/delegado`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const DelegadoPut = async ({ form, equipoId, delegadoId }: { form: any; equipoId: any; delegadoId: any }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/delegado/${delegadoId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const DelegadoDelete = async ({ equipoId, delegadoId }: { equipoId: any; delegadoId: any }) => {
    try {
        const data = await api.delete(`/api/liga/${equipoId}/delegado/${delegadoId}`).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}