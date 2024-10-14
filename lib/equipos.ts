import { alertaQuestion, alertaSubmit } from "@/utils/altert";
import { QueryClient } from "react-query";
import { filterEstado } from "@/utils";
import moment from "moment";

export const nuevoEquipo = (
    nombre: string,
    logo: any,
    correo: string,
    instagram: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    crearEquipo: any,
    queryClient: QueryClient,
    setImage: React.Dispatch<React.SetStateAction<any>>,
    setInstagram: React.Dispatch<React.SetStateAction<any>>,
    setLogoAdded: React.Dispatch<React.SetStateAction<any>>,
    setImageName: React.Dispatch<React.SetStateAction<any>>,
    router: any,
    setErrorLogo: React.Dispatch<React.SetStateAction<any>>,
    setErrorLogoMessage: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    if (!logo) {
        alertaSubmit(false, 'El logo del equipo es requerido');
        setIsLoading(false);
        setErrorLogo(true);
        setErrorLogoMessage('El logo del equipo es requerido')
        return;
    }
    const formData = { form: { name: nombre, logo, correo, instagram } };
    crearEquipo(formData, {
        onSuccess: (success: { message: string; }) => {
            queryClient.invalidateQueries(["/api/liga"])
            setImage('');
            setInstagram('')
            setLogoAdded(false);
            setImageName('');
            alertaSubmit(true, success?.message);
            router.replace("/");
            // setTimeout(() => {
            //     alertaCheck('Registrado!', 'Gracias por crear un equipo en nuestra plataforma. En breve recibirás un correo electrónico con la confirmación de su registro. Si tiene alguna pregunta o necesita ayuda adicional, no dude en ponerse en contacto con nuestro equipo de soporte.');
            // }, 4000);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const eliminarEquipos = (id: string, eliminarEquipo: any, queryClient: QueryClient) => {
    alertaQuestion(id, {}, (id: string) => {
        eliminarEquipo({ id }, {
            onSuccess: (success: { message: string; }) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Eliminar!', 'Eliminado!', 'El equipo ha sido eliminado.', 'El equipo sigue en cola :)')
}

export const editarEstado = (
    id: string,
    estado: string,
    editarEstados: any,
    queryClient: QueryClient,
    subCategoria: any,
    liga: any,
) => {
    const formData = { estado: estado, subCategoria: subCategoria };
    alertaQuestion(id, formData, (id: string, formData: any) => {
        editarEstados({ form: formData, id }, {
            onSuccess: (success: any) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, `Se registro el equipo correctamente en ${liga}`);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Registrar!', `Registrado en ${liga}.!`, `El equipo ha sido registrado en ${liga}.`, `El equipo sigue en ${liga}:)`);
};

export const editarFechas = (
    id: string,
    index: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarFecha: any,
    queryClient: QueryClient,
    handleClose: () => void,
    data: any,
    fecha: any,
) => {
    setIsLoading(true);
    const updatedFecha = moment(fecha).format('YYYY-MM-DD HH:mm:ss');
    const updatedFechaArr = [...data.fecha];
    updatedFechaArr[index] = updatedFecha;
    const formData = { fecha: updatedFechaArr };
    editarFecha({ form: formData, id }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, 'Se editó la fecha correctamente');
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

export const editarArbitros = (
    id: string,
    arbitro: string,
    index: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarArbitro: any,
    queryClient: QueryClient,
    handleClose: () => void,
    data: any,
    setErrorArbitro: React.Dispatch<React.SetStateAction<any>>,
    setErrorArbitroTex: React.Dispatch<React.SetStateAction<any>>,
) => {
    setIsLoading(true);
    const updatedArbitro = arbitro;
    const updatedArbitroArr = [...data.arbitro];
    updatedArbitroArr[index] = updatedArbitro;
    const formData = { arbitro: updatedArbitroArr };
    if (arbitro === 'Elija una opción') {
        setErrorArbitro(true)
        setErrorArbitroTex('El arbitro es requerido')
        setIsLoading(false);
        return;
    }
    editarArbitro({ form: formData, id }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, 'Se editó el arbitro correctamente');
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

export const editarEstadoSuspender = (
    id: string,
    estado: string,
    editarEstados: any,
    queryClient: QueryClient,
    subCategoria: string,
) => {
    const formData = { estado: estado, subCategoria: subCategoria };
    alertaQuestion(id, formData, (id: string, formData: any) => {
        editarEstados({ form: formData, id }, {
            onSuccess: (success: any) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, `Se suspendio el equipo correctamente, se envio a "Equipos en cola"`);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Suspender!', `Suspendido.!`, `El equipo ha sido suspendido.`, `El equipo no fue suspendido:)`);
};

export const editarReset = async (
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    queryClient: QueryClient,
    data: any,
    reseteoEquipos: any,
) => {
    alertaQuestion("", {}, () => {
        setIsLoading(true);
        filterEstado(data, 'registrado').forEach(equiposdata => {
            reseteoEquipos({ equipoID: equiposdata._id }, {
                onSuccess: (success: any) => {
                    queryClient.invalidateQueries(["/api/liga"]);
                    setIsLoading(false);
                },
                onError: (err: any) => {
                    const errorMessage = err?.response?.data?.message || err.message;
                    alertaSubmit(false, errorMessage);
                    setIsLoading(false);
                },
            });
        });
    }, 'Si, Resetear!', 'Reinicio de Equipos', '¡Los equipos fueron reseteados correctamente!', 'Los equipos no fueron reseteados',);
};

export const devolverJugador = (
    data: any,
    devolver: any,
    queryClient: QueryClient,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
) => {
    alertaQuestion("", {}, () => {
        setIsLoading(true);
        const form = {};

        filterEstado(data, 'registrado').forEach(equiposdata => {
            equiposdata.jugadores.forEach((jugador: { _id: any; }) => {
                devolver({ form, equipoOrigenId: equiposdata._id, jugadorId: jugador._id }, {
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
            });
        });
    }, 'Si, Devolver!', 'Devolver jugadores', '¡Los jugadores volvieron a sus equipos correctamente!', 'Los jugadores no volvieron');
}

export const calculoContratosJugadores = (
    data: any,
    calculo: any,
    queryClient: QueryClient,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
) => {
    alertaQuestion("", {}, () => {
        setIsLoading(true);
        const form = {};

        filterEstado(data, 'registrado').forEach(equiposdata => {
            equiposdata.jugadores.forEach((jugador: { _id: any; }) => {
                calculo({ form, equipoId: equiposdata._id, jugadorId: jugador._id }, {
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
            });
        });
    }, 'Si, analizar contratos!', 'Analizar contratos', '¡Los contratos fueron actualizados correctamente!', 'Los contratos quedan igual');
}