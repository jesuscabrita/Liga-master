import { useQuery } from "react-query";
import { alertaSubmit } from "@/utils/altert";
import { UserGet, UserGetById } from "@/services/user";
import { equiposGet, equiposGetById } from "@/services/equipos";

export const fetchEquiposSet = (setEquipo: React.Dispatch<React.SetStateAction<any>>) => {
    return useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setEquipo(data);
        },
    });
};

export const fetchEquipos = () => {
    return useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
        },
    });
};

export const fetchEquiposById =(equipo_id: any)=>{
    return useQuery(["equipos", equipo_id], () => equiposGetById(equipo_id), {
        refetchOnWindowFocus: false,
        onError: (err: any) => {
            const errorMessage = `No se encontró el equipo con el ID: ${equipo_id}`
            alertaSubmit(false, errorMessage);
        }
    });
}

export const fetchUserGetById = (userId: string) => {
    return useQuery(["usuario", userId], () => UserGetById(userId), {
        refetchOnWindowFocus: false,
        onError: (err: any) => {
            const errorMessage = `No se encontró el usuario con el ID: ${userId}`
            alertaSubmit(false, errorMessage);
        }
    });
}

export const fetchUserGet = () => {
    return useQuery(["user"], UserGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
        },
    });
}