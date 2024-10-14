import { alertaQuestion, alertaSubmit } from "@/utils/altert";
import { QueryClient } from "react-query";

export const eliminarDelegados = (
    equipoId: any,
    delegadoId: string,
    eliminarDelegado: any,
    queryClient: QueryClient,
) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        eliminarDelegado({ equipoId, delegadoId }, {
            onSuccess: (success: { message: string; }) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Eliminar!', 'Eliminado de el equipo!', 'El delegado ha sido eliminado.', 'El delegado sigue en el equipo :)')
}

export const editarDelegado = (
    equipoId: string,
    delegadoId: string,
    name: string,
    telefono: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editardelegados: any,
    queryClient: QueryClient,
    handleClose: () => void,
) => {
    setIsLoading(true);
    const formData = { name, telefono };
    editardelegados({ form: formData, equipoId, delegadoId }, {
        onSuccess: (success: { message: string; }) => {
            queryClient.invalidateQueries(["equipos"]);
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

export const crearDelegado = (
    id: string,
    name: string,
    telefono: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    crearDelegados: any,
    queryClient: QueryClient,
    handleClose: () => void,
    setErrorName: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageName: React.Dispatch<React.SetStateAction<any>>,
    setErrorTelefono: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageTelefono: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const formData = { name, telefono };
    crearDelegados({ form: formData, eid: id }, {
        onSuccess: (success: { message: string; }) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
            if (errorMessage === 'El nombre del delegado es requerido') {
                setErrorName(true)
                setErrorMessageName(errorMessage)
            }
            if (errorMessage === 'El telefono del delegado es requerido') {
                setErrorTelefono(true)
                setErrorMessageTelefono(errorMessage)
            }
        },
    });
}