import { alertaSubmit } from "@/utils/altert";
import { QueryClient } from "react-query";

export const crearOferta = (
    equipoId: string,
    jugadorId: string,
    equipo: string,
    logo: number,
    precio: string,
    contrato: string,
    tipo: string,
    sueldo: any,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    oferta: any,
    queryClient: QueryClient,
    handleClose: () => void,
    comentario: string,
    respuesta: string,
    email: string,
    id_equipo_destino: string,
    setSueldoError: React.Dispatch<React.SetStateAction<any>>,
    setSueldoErrorText: React.Dispatch<React.SetStateAction<any>>,
    setContratoError: React.Dispatch<React.SetStateAction<any>>,
    setContratoErrorText: React.Dispatch<React.SetStateAction<any>>,
    setPrecioError: React.Dispatch<React.SetStateAction<any>>,
    setPrecioErrorText: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const formData = { equipo, logo, precio, contrato, tipo, sueldo, comentario, respuesta, email, id_equipo_destino };
    oferta({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: { message: string; }) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
            handleClose();
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
            if (errorMessage === 'El sueldo del jugador es requerido' || errorMessage.includes('El sueldo propuesto debe ser mayor o igual')) {
                setSueldoError(true);
                setSueldoErrorText(errorMessage);
            }
            if (errorMessage === 'El contrato del jugador es requerido') {
                setContratoError(true);
                setContratoErrorText(errorMessage);
            }
            if (errorMessage === 'La oferta del jugador es requerida' || errorMessage.includes('El precio del jugador debe ser mayor o igual a')) {
                setPrecioError(true);
                setPrecioErrorText(errorMessage);
            }
        },
    });
}

export const crearOfertaPrestamo = (
    equipoId: string,
    jugadorId: string,
    equipo: string,
    logo: number,
    precio: string,
    contrato: string,
    tipo: string,
    sueldo: any,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    oferta: any,
    queryClient: QueryClient,
    handleClose: () => void,
    comentario: string,
    respuesta: string,
    email: string,
    id_equipo_destino: string
) => {
    setIsLoading(true);
    const formData = { equipo, logo, precio, contrato, tipo, sueldo, comentario, respuesta, email, id_equipo_destino };
    oferta({ form: formData, equipoId, jugadorId }, {
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

export const eliminarOfertas = (
    equipoId: string,
    jugadorId: string,
    ofertaId: string,
    deleteOfertas: any,
    queryClient: QueryClient,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    deleteOfertas({ equipoId, jugadorId, ofertaId }, {
        onSuccess: (success: { message: string; }) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}

export const editOfertaJugador = (
    equipoId: string,
    jugadorId: string,
    ofertaId: string,
    editOferta: any,
    queryClient: QueryClient,
    respuesta: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    handleClose: () => void,
    message: string,
) => {
    setIsLoading(true);
    const formData = {
        respuesta: respuesta,
    };
    editOferta({ form: formData, equipoId, jugadorId, ofertaId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, message);
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

export const editOfertaNegociacion = (
    equipoId: string,
    jugadorId: string,
    ofertaId: string,
    editOferta: any,
    queryClient: QueryClient,
    respuesta: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    handleClose: () => void,
    message: string,
    precio: number,
    contrato: string,
    comentario: string,
    equipo: string,
    logo: string,
    setPrecioError: React.Dispatch<React.SetStateAction<any>>,
    setPrecioErrorText: React.Dispatch<React.SetStateAction<any>>,
    setContratoError: React.Dispatch<React.SetStateAction<any>>,
    setContratoErrorText: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const formData = {
        respuesta: respuesta,
        precio: precio,
        contrato: contrato,
        comentario: comentario,
        equipo: equipo,
        logo: logo,
    };
    editOferta({ form: formData, equipoId, jugadorId, ofertaId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, message);
            setIsLoading(false);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
            if (errorMessage === 'La oferta del jugador es requerida') {
                setPrecioError(true);
                setPrecioErrorText(errorMessage);
            }
            if (errorMessage === 'El contrato del jugador es requerido') {
                setContratoError(true);
                setContratoErrorText(errorMessage);
            }
        },
    });
}

export const eliminarOfertasModals = (
    equipoId: string,
    jugadorId: string,
    ofertaId: string,
    deleteOfertas: any,
    queryClient: QueryClient,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    handleClose: () => void
) => {
    setIsLoading(true);
    deleteOfertas({ equipoId, jugadorId, ofertaId }, {
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