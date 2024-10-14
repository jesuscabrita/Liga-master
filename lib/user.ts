import { alertaSubmit } from "@/utils/altert";

export const editarUser = (
    userId: string,
    nombre: string,
    apellido: string,
    role: string,
    email: string,
    fecha_de_nacimiento: any,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarUsuario: any,
    queryClient: any,
    handleClose: () => void,
) => {
    setIsLoading(true);
    const formData = { nombre, apellido, role, email, fecha_de_nacimiento };
    editarUsuario({ form: formData, userId }, {
        onSuccess: (success: { message: string; }) => {
            queryClient.invalidateQueries(["user"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}

export const editarPerfilUser = (
    userId: string,
    nombre: string,
    apellido: string,
    email: string,
    fecha_de_nacimiento: any,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarPerfilUser: any,
    queryClient: any,
    handleClose: () => void,
) => {
    setIsLoading(true);
    const formData = { nombre, apellido, email, fecha_de_nacimiento };
    editarPerfilUser({ form: formData, userId }, {
        onSuccess: (success: { message: string; }) => {
            queryClient.invalidateQueries(["usuario"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}