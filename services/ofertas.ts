import { ApiError } from "@/interfaces";
import { api } from "./api";

export const ofertaPost = async ({ form, equipoId, jugadorId }: { form: any; equipoId: string; jugadorId: string }) => {
    try {
        const data = await api.post(`/api/liga/${equipoId}/oferta/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const ofertaPut = async ({ form, equipoId, jugadorId, ofertaId }: { form: any; equipoId: string; jugadorId: string; ofertaId: string }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/ofertaEdit/${jugadorId}/${ofertaId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const ofertaDelete = async ({ equipoId, jugadorId, ofertaId }: { equipoId: string; jugadorId: string; ofertaId: string }) => {
    try {
        const data = await api.delete(`/api/liga/${equipoId}/deleteOferta/${jugadorId}/${ofertaId}`).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const ficharJugador = async ({ form, equipoOrigenId, equipoDestinoId, jugadorId }: { form: any; equipoOrigenId: string; equipoDestinoId: string; jugadorId: string; }) => {
    try {
        const data = await api.post(`/api/liga/${equipoOrigenId}/fichar/${equipoDestinoId}/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const prestamoJugador = async ({ form, equipoOrigenId, equipoDestinoId, jugadorId }: { form: any; equipoOrigenId: string; equipoDestinoId: string; jugadorId: string; }) => {
    try {
        const data = await api.post(`/api/liga/${equipoOrigenId}/prestamo/${equipoDestinoId}/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const devolverJugadorPrestamo = async ({ form, equipoOrigenId, jugadorId }: { form: any; equipoOrigenId: string; jugadorId: string; }) => {
    try {
        const data = await api.post(`/api/liga/${equipoOrigenId}/devolverPrestamo/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}