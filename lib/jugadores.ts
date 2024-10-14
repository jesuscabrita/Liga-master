import { alertaQuestion, alertaSubmit } from "@/utils/altert";
import { QueryClient } from "react-query";

export const crearJugadores = (
    id: string,
    name: string,
    sueldo: any,
    contrato: any,
    posicion: string,
    fecha_nacimiento: string,
    nacionalidad: string,
    dorsal: string,
    instagram: string,
    foto: any,
    documento: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    crearJugador: any,
    queryClient: QueryClient,
    handleClose: () => void,
    setErrorName: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageName: React.Dispatch<React.SetStateAction<any>>,
    setErrorDocumento: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageDocumento: React.Dispatch<React.SetStateAction<any>>,
    setErrorFecha: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageFecha: React.Dispatch<React.SetStateAction<any>>,
    setErrorPosicion: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessagePosicion: React.Dispatch<React.SetStateAction<any>>,
    setErrorNacionalidad: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageNacionalidad: React.Dispatch<React.SetStateAction<any>>,
    setErrorContrato: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageContrato: React.Dispatch<React.SetStateAction<any>>,
    setErrorSueldo: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageSueldo: React.Dispatch<React.SetStateAction<any>>,
    setErrorDorsal: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageDorsal: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const formData = { name, sueldo, contrato, posicion, fecha_nacimiento, nacionalidad, dorsal, instagram, foto, documento };
    crearJugador({ form: formData, eid: id }, {
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
            if (errorMessage === 'El nombre del jugador es requerido') {
                setErrorName(true);
                setErrorMessageName(errorMessage)
            }
            if (errorMessage === 'El DNI/Documento del jugador es requerido' || errorMessage.includes('Ya xiste un jugador con el documento:')) {
                setErrorDocumento(true);
                setErrorMessageDocumento(errorMessage)
            }
            if (errorMessage === 'La fecha de nacimiento del jugador es requerida') {
                setErrorFecha(true);
                setErrorMessageFecha(errorMessage)
            }
            if (errorMessage === 'La posicion del jugador es requerida') {
                setErrorPosicion(true);
                setErrorMessagePosicion(errorMessage)
            }
            if (errorMessage === 'La nacionalidad del jugador es requerida') {
                setErrorNacionalidad(true);
                setErrorMessageNacionalidad(errorMessage)
            }
            if (errorMessage === 'Debe seleccionar un contrato') {
                setErrorContrato(true);
                setErrorMessageContrato(errorMessage)
            }
            if (errorMessage === 'El sueldo del jugador es requerido' || errorMessage === 'El sueldo del jugador debe ser de al menos 500,000' || errorMessage === 'Excediste el límite salarial, no cumples con el Fair play financiero') {
                setErrorSueldo(true);
                setErrorMessageSueldo(errorMessage)
            }
            if (errorMessage === 'El dorsal del jugador es requerido' || errorMessage.includes('Ya hay un jugador en este equipo con el dorsal')) {
                setErrorDorsal(true);
                setErrorMessageDorsal(errorMessage)
            }
        },
    });
}

export const editarJugadores = (
    equipoId: string,
    jugadorId: string,
    name: string,
    posicion: string,
    fecha_nacimiento: string,
    nacionalidad: string,
    instagram: string,
    foto: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarJugador: any,
    queryClient: QueryClient,
    handleClose: () => void,
    setErrorName: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageName: React.Dispatch<React.SetStateAction<any>>,
    setErrorFecha: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageFecha: React.Dispatch<React.SetStateAction<any>>,
    setErrorPosicion: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessagePosicion: React.Dispatch<React.SetStateAction<any>>,
    setErrorNacionalidad: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageNacionalidad: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const formData = { name, posicion, fecha_nacimiento, nacionalidad, instagram, foto };
    editarJugador({ form: formData, equipoId, jugadorId }, {
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
            if (errorMessage === 'El nombre del jugador es requerido') {
                setErrorName(true);
                setErrorMessageName(errorMessage)
            }
            if (errorMessage === 'La fecha de nacimiento del jugador es requerida') {
                setErrorFecha(true);
                setErrorMessageFecha(errorMessage)
            }
            if (errorMessage === 'La posicion del jugador es requerida') {
                setErrorPosicion(true);
                setErrorMessagePosicion(errorMessage)
            }
            if (errorMessage === 'La nacionalidad del jugador es requerida') {
                setErrorNacionalidad(true);
                setErrorMessageNacionalidad(errorMessage)
            }
        },
    });
}

export const eliminarJugadores = (
    equipoId: string,
    jugadorId: string,
    eliminarJugador: any,
    queryClient: QueryClient,
) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        eliminarJugador({ equipoId, jugadorId }, {
            onSuccess: (success: { message: string; }) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Eliminar!', 'Eliminado de el equipo!', 'El jugador ha sido eliminado.', 'El jugador sigue en el equipo :)')
}

export const editarCapitan = (
    equipoId: string,
    jugadorId: string,
    jugador_name: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarCapitan: any,
    queryClient: QueryClient,
    valueCapitan: string,
    handleClose: () => void,
) => {
    setIsLoading(true);
    const formData = {
        capitan: valueCapitan,
    };
    editarCapitan({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, `${jugador_name} ${valueCapitan === 'Si' ? '' : 'no'} es capitan!`);
            setIsLoading(false);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const lesionJugadores = (
    equipoId: string,
    jugadorId: string,
    lesionJugador: any,
    queryClient: QueryClient,
    lesion: string,
    texto1: string,
    texto2: string,
    texto3: string,
    texto4: string,
) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        const formData = {
            lesion: lesion,
        };
        lesionJugador({ form: formData, equipoId, jugadorId }, {
            onSuccess: (success: { message: string; }) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, `${texto1}`, `${texto2}`, `${texto3}`, `${texto4}`)
}

export const editarJornada = (
    equipoId: string,
    jugadorId: string,
    jugador_name: string,
    partidoJornada: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarPartidos: any,
    queryClient: QueryClient,
    value: string,
    handleClose: () => void,
    setJornada: React.Dispatch<React.SetStateAction<any>>,
    suma: boolean,
    setErrorJornada: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageJornada: React.Dispatch<React.SetStateAction<any>>,
    setErrorJornadaResta: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageJornadaResta: React.Dispatch<React.SetStateAction<any>>,
    jornada: string,
    jornadaResta: string,
) => {
    setIsLoading(true);
    if (suma && jornada === 'Elija una opción') {
        setIsLoading(false);
        setErrorJornada(true)
        setErrorMessageJornada('Debes seleccinar las jornadas')
        alertaSubmit(false, 'Debes seleccinar las jornadas');
        return;
    }
    if (!suma && jornadaResta === 'Elija una opción') {
        setIsLoading(false);
        setErrorJornadaResta(true)
        setErrorMessageJornadaResta('Debes seleccinar las jornadas')
        alertaSubmit(false, 'Debes seleccinar las jornadas');
        return;
    }
    const formData = {
        jornadas_suspendido: suma ? partidoJornada + parseInt(value, 10) : partidoJornada - parseInt(value, 10),
    };
    editarPartidos({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, `${jugador_name} se le modifico la jornadas suspendias!`);
            setIsLoading(false);
            setJornada('')
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const listaDeTransferibles = (
    equipoId: string,
    jugadorId: string,
    listaTransferibles: any,
    queryClient: QueryClient,
    transferible: string,
    texto1: string,
    texto2: string,
    texto3: string,
    texto4: string,
) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        const formData = {
            transferible: transferible,
        };
        listaTransferibles({ form: formData, equipoId, jugadorId }, {
            onSuccess: (success: { message: string; }) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, `${texto1}`, `${texto2}`, `${texto3}`, `${texto4}`)
}

export const InscribirJugador = (
    equipoId: string,
    jugadorId: string,
    inscribir: any,
    queryClient: QueryClient,
    inscrito: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>
) => {
    setIsLoading(true);
    const formData = {
        inscrito: inscrito,
    };
    inscribir({ form: formData, equipoId, jugadorId }, {
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

export const editarRenovacion = (
    equipoId: string,
    jugadorId: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarRenovacion: any,
    queryClient: QueryClient,
    handleClose: () => void,
    contrato: any,
    sueldo: number,
    setErrorSueldo: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageSueldo: React.Dispatch<React.SetStateAction<any>>,
    setErrorContrato: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageContrato: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const formData = {
        contrato: contrato,
        sueldo: sueldo,
    };
    editarRenovacion({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: { message: any; }) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
            handleClose();
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
            if (errorMessage === 'El sueldo del jugador es requerido' ||
                errorMessage.includes('El sueldo del jugador debe ser mayor o igual a') ||
                errorMessage === 'Excediste el límite salarial, no cumples con el Fair play financiero'
            ) {
                setErrorSueldo(true);
                setErrorMessageSueldo(errorMessage);
            }
            if (errorMessage === 'El contrato del jugador es requerido') {
                setErrorContrato(true);
                setErrorMessageContrato(errorMessage);
            }
        },
    });
};

export const DorsalJugador = (
    equipoId: string,
    jugadorId: string,
    EditDorsal: any,
    queryClient: QueryClient,
    dorsal: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    handleClose: () => void,
    setErrorDorsal: React.Dispatch<React.SetStateAction<any>>,
    setErrorMessageDorsal: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const formData = {
        dorsal: dorsal,
    };
    EditDorsal({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: { message: any; }) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, success?.message);
            handleClose()
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
            if (errorMessage === 'El dorsal del jugador es requerido' || errorMessage.includes('Ya hay un jugador en este equipo con el dorsal')) {
                setErrorDorsal(true);
                setErrorMessageDorsal(errorMessage)
            }
        },
    });
}

export const RecindirJugador = (
    equipoId: string,
    jugadorId: string,
    recindirContrato: any,
    queryClient: QueryClient,
    libre: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    handleClose: () => void
) => {
    setIsLoading(true);
    const formData = {
        libre: libre,
    };
    recindirContrato({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: { message: any; }) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, success?.message);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
        },
    });
}