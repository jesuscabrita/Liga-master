import { api } from "./api";
import { ApiError } from "@/interfaces";

export const UserGet = async () => {
    try {
        const { data } = await api.get('api/user')
        return data;
    }
    catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const UserGetById = async (uid: string) => {
    try {
        const data = await api.get(`api/user/${uid}`)
        return data;
    }
    catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const userPut = async ({ form, userId }: { form: any; userId: string }) => {
    try {
        const data = await api.put(`/api/user/${userId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}

export const userDelete = async ({ userId }: { userId: string }) => {
    try {
        const data = await api.delete(`/api/user/${userId}`).then(res => res.data)
        return data;
    } catch (err) {
        const typedError = err as ApiError;
        const message = typedError?.response?.data?.message || typedError.message;
        throw new Error(message);
    }
}