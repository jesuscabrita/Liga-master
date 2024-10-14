import { alertaSubmit } from "@/utils/altert";
import { QueryClient } from "react-query";

export const datosDelPartidoHome = (
    equipoId: string,
    partidosHomeJugados: any,
    equipoHomeGol: number,
    equipoAwayGol: number,
    partidoGanado: number,
    partidoEmpatado: number,
    partidoPerdido: number,
    golEnContra: number,
    golAfavor: number,
    equipoHomePuntos: number,
    homeLast: string[],
    currentRound: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    data: any[],
    calcularDatosPartidos: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let PartidoJugadoSuma = partidosHomeJugados + 1;
    let sumaGanados = equipoHomeGol > equipoAwayGol ? partidoGanado + 1 : partidoGanado;
    let sumaEmpates = equipoHomeGol == equipoAwayGol ? partidoEmpatado + 1 : partidoEmpatado;
    let sumaPerdidos = equipoHomeGol < equipoAwayGol ? partidoPerdido + 1 : partidoPerdido;
    let sumaGoEnContra = golEnContra + equipoAwayGol;
    let calculoDiferenciaGoles = golAfavor - sumaGoEnContra;
    let sumaPuntos =
        equipoHomeGol > equipoAwayGol
            ? equipoHomePuntos + 3
            : equipoHomeGol < equipoAwayGol
                ? equipoHomePuntos
                : equipoHomePuntos + 1;
    let valueLast = [...homeLast];
    if (equipoHomeGol > equipoAwayGol) {
        valueLast[currentRound] = 'win';
    } else if (equipoHomeGol < equipoAwayGol) {
        valueLast[currentRound] = 'loss';
    } else {
        valueLast[currentRound] = 'draw';
    }
    let calculoPuntajeAnterior = data?.findIndex(item => item._id === equipoId)

    const formData = {
        partidosJugados: PartidoJugadoSuma,
        ganados: sumaGanados,
        empates: sumaEmpates,
        perdidos: sumaPerdidos,
        goles_en_Contra: sumaGoEnContra,
        diferencia_de_Goles: calculoDiferenciaGoles,
        puntos: sumaPuntos,
        last5: valueLast,
        puntaje_anterior: calculoPuntajeAnterior,
    };
    calcularDatosPartidos({ form: formData, equipoId }, {
        onSuccess: (success: { message: string; }) => {
            queryClient.invalidateQueries(["/api/liga"]);
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

export const editarSuspencion = (
    equipoId: string,
    jugadorId: string,
    jugadorSuspendido: string,
    jugador_name: string,
    jornadaSuspendido: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarSupendido: any,
    queryClient: QueryClient,
    tarjetasAcumuladas: number,
) => {
    setIsLoading(true);
    let suspencion = jugadorSuspendido;
    let jornada = jornadaSuspendido;
    let acumulada = tarjetasAcumuladas;

    if (acumulada === 2) {
        suspencion = 'Si';
        acumulada = 0;
        jornada += 1;
    } else {
        if (jornada >= 1) {
            jornada -= 1;
            if (jornada === 0) {
                suspencion = 'No';
            }
        }
        if (suspencion === 'Si') {
            jornada += 1;
        }
    }

    const formData = {
        suspendido: suspencion,
        jornadas_suspendido: jornada,
        tarjetas_acumuladas: acumulada,
    };
    editarSupendido({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `${jugador_name} se le modifico su suspencion!`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarAutoGol = (
    equipoId: string,
    autogol_partido: number,
    index: number,
    jugador_gol: number,
    jugador_autogol: number,
    golesAFavor: number,
    golPartidoIndividual: number[],
    autogolPartidoEquipo: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAutogoles: any,
    queryClient: QueryClient
) => {
    setIsLoading(true);
    let updatedGolpartidoArr = [...golPartidoIndividual];
    let updatedGolpartido = jugador_gol + autogol_partido;
    updatedGolpartidoArr[index] = updatedGolpartido;

    let updatedAutoGolEquipoArr = [...autogolPartidoEquipo];
    let updatedAutoGolEquipo = jugador_autogol + autogol_partido;
    updatedAutoGolEquipoArr[index] = updatedAutoGolEquipo;

    let sumaGolesaFavor = golesAFavor + autogol_partido
    const formData = {
        gol_partido: updatedGolpartidoArr,
        autogol_partido: updatedAutoGolEquipoArr,
        goles_a_Favor: sumaGolesaFavor,
    };
    editarAutogoles({ form: formData, equipoId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Auto gol`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularAutoGol = (
    equipoId: string,
    autogol_partido: number,
    index: number,
    jugador_gol: number,
    jugador_autogol: number,
    golesAFavor: number,
    golPartidoIndividual: number[],
    autogolPartidoEquipo: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAutogoles: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedGolpartidoArr = [...golPartidoIndividual];
    let updatedGolpartido = jugador_gol - autogol_partido;
    updatedGolpartidoArr[index] = updatedGolpartido;

    let updatedAutoGolEquipoArr = [...autogolPartidoEquipo];
    let updatedAutoGolEquipo = jugador_autogol - autogol_partido;
    updatedAutoGolEquipoArr[index] = updatedAutoGolEquipo;

    let sumaGolesaFavor = golesAFavor - autogol_partido
    const formData = {
        gol_partido: updatedGolpartidoArr,
        autogol_partido: updatedAutoGolEquipoArr,
        goles_a_Favor: sumaGolesaFavor,
    };
    editarAutogoles({ form: formData, equipoId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Auto gol anulado`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarPartido = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_name: string,
    partido: number,
    partidoIndividual: any,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarPartidos: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedpartidoArr = [...partidoIndividual];
    let updatedpartido = 'Si';
    updatedpartidoArr[index] = updatedpartido;
    let sumaPartido = partido + 1;

    const formData = {
        partidos_individual: updatedpartidoArr,
        partidos: sumaPartido,
    };
    editarPartidos({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `${jugador_name} convocado!`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const bajarPartido = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_name: string,
    partido: number,
    partidoIndividual: any,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarPartidos: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedpartidoArr = [...partidoIndividual];
    let updatedpartido = 'No';
    updatedpartidoArr[index] = updatedpartido;
    let restarPartido = partido - 1;

    const formData = {
        partidos_individual: updatedpartidoArr,
        partidos: restarPartido,
    };
    editarPartidos({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `${jugador_name} Baja de la convocatoria!`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarGoles = (
    equipoId: string,
    jugadorId: string,
    gol_partido: number,
    index: number,
    jugador_gol: number,
    jugador_name: string,
    goles: number,
    equipo: any,
    golesAFavor: number,
    golPartidoIndividual: number[],
    golPartidoEquipo: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarGol: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedGolpartidoArr = [...golPartidoIndividual];
    let updatedGolpartido = jugador_gol + gol_partido;
    updatedGolpartidoArr[index] = updatedGolpartido;
    let sumaGolesaFavor = golesAFavor + gol_partido
    let updatedGolEquipoArr = [...golPartidoEquipo];
    let updatedGolEquipo = equipo + gol_partido;
    updatedGolEquipoArr[index] = updatedGolEquipo;
    let sumaGoles = goles + gol_partido;
    const formData = {
        gol_partido_individual: updatedGolpartidoArr,
        gol_partido: updatedGolEquipoArr,
        goles: sumaGoles,
        goles_a_Favor: sumaGolesaFavor,
    };
    editarGol({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Golll! de ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarAsistencia = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_asistencia: number,
    jugador_name: string,
    asistencia: number,
    asistenciaPartidoIndividual: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAsistencias: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedAsistenciapartidoArr = [...asistenciaPartidoIndividual];
    let updatedAsistenciapartido = jugador_asistencia + 1;
    updatedAsistenciapartidoArr[index] = updatedAsistenciapartido;
    let sumaAsistencia = asistencia + 1;
    const formData = {
        asistencia_partido_individual: updatedAsistenciapartidoArr,
        asistencias: sumaAsistencia,
    };
    editarAsistencias({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Asistencia de ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarAmarilla = (
    equipoId: string,
    jugadorId: string,
    amarilla_partido: number,
    index: number,
    jugador_amarilla: number,
    jugador_name: string,
    amarillas: number,
    amarillasAFavor: number,
    amarillaPartidoIndividual: number[],
    rojaPartidoIndividual: number[],
    jugador_roja: number,
    rojasAFavor: number,
    rojas: number,
    suspendidoJugador: string,
    suspendidoNumero: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAmarillas: any,
    queryClient: QueryClient,
    tarjetasAcumuladas: number,
) => {
    setIsLoading(true);
    let updatedAmarillaspartidoArr = [...amarillaPartidoIndividual];
    let updatedAmarillapartido = jugador_amarilla + amarilla_partido;
    updatedAmarillaspartidoArr[index] = updatedAmarillapartido;
    let sumaAmarillasaFavor = amarillasAFavor + amarilla_partido
    let sumaAmarillas = amarillas + amarilla_partido;
    let updateRojaPartidoArr = [...rojaPartidoIndividual];
    let updatedRojapartido =
        updateRojaPartidoArr[index] === 2 ? jugador_roja + 1 : jugador_roja;
    updateRojaPartidoArr[index] = updatedRojapartido;
    let sumarRojasaFavor =
        updateRojaPartidoArr[index] === 2 ? rojasAFavor + 1 : rojasAFavor;
    let sumarRojas = updateRojaPartidoArr[index] === 2 ? rojas + 1 : rojas;
    let sumarSuspencion =
        updateRojaPartidoArr[index] === 2 ? suspendidoNumero + 1 : suspendidoNumero;
    let suspenderJugador = updateRojaPartidoArr[index] === 2 ? suspendidoJugador = 'Si' : suspendidoJugador
    if (jugador_amarilla >= 2) {
        alertaSubmit(false, `solo se puede sacar 2 amarillas por partido, ya debio estar expulsado ${jugador_name}`);
        setIsLoading(false);
        return;
    }
    if (updatedAmarillapartido === 2) {
        updateRojaPartidoArr[index] = 1;
        sumarRojasaFavor += 1;
        sumarRojas += 1;
        sumarSuspencion += 1;
        suspenderJugador = 'Si';
    }
    let acumulada = tarjetasAcumuladas + amarilla_partido
    const formData = {
        amarilla_partido_individual: updatedAmarillaspartidoArr,
        tarjetas_amarillas: sumaAmarillas,
        tarjetasAmarillas: sumaAmarillasaFavor,
        roja_partido_individual: updateRojaPartidoArr,
        tarjetas_roja: sumarRojas,
        tarjetasRojas: sumarRojasaFavor,
        suspendido_numero: sumarSuspencion,
        suspendido: suspenderJugador,
        tarjetas_acumuladas: acumulada
    };
    editarAmarillas({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Amarilla para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarRoja = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_roja: number,
    jugador_name: string,
    rojas: number,
    rojasAFavor: number,
    rojaPartidoIndividual: number[],
    suspendidoNumero: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarRojas: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedRojaspartidoArr = [...rojaPartidoIndividual];
    let updatedRojapartido = jugador_roja + 1;
    updatedRojaspartidoArr[index] = updatedRojapartido;
    let sumaRojasaFavor = rojasAFavor + 1;
    let sumaRojas = rojas + 1;
    let sumarSuspencion = suspendidoNumero + 1;
    if (jugador_roja >= 1) {
        alertaSubmit(false, 'solo se puede sacar 1 roja por partido');
        setIsLoading(false);
        return;
    }
    const formData = {
        roja_partido_individual: updatedRojaspartidoArr,
        tarjetas_roja: sumaRojas,
        tarjetasRojas: sumaRojasaFavor,
        suspendido_numero: sumarSuspencion,
        suspendido: 'Si',
    };
    editarRojas({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Roja para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarAzul = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_azul: number,
    jugador_name: string,
    azul: number,
    azulPartidoIndividual: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAzules: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedAzulpartidoArr = [...azulPartidoIndividual];
    let updatedAzulpartido = jugador_azul + 1;
    updatedAzulpartidoArr[index] = updatedAzulpartido;
    let sumaAzul = azul + 1;
    if (jugador_azul >= 1) {
        alertaSubmit(false, 'solo se puede sacar 1 azul por partido');
        setIsLoading(false);
        return;
    }
    const formData = {
        azul_partido_individual: updatedAzulpartidoArr,
        tarjetas_azul: sumaAzul,
    };
    editarAzules({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Azul para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarFigura = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_figura: number,
    jugador_name: string,
    figura: number,
    figuraPartidoIndividual: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAsistencias: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedFigurapartidoArr = [...figuraPartidoIndividual];
    let updatedFigurapartido = jugador_figura + 1;
    updatedFigurapartidoArr[index] = updatedFigurapartido;
    let sumaFigura = figura + 1;
    if (jugador_figura >= 1) {
        alertaSubmit(false, 'solo se puede ser figura 1 vez por partido');
        setIsLoading(false);
        return;
    }
    const formData = {
        jugador_figura_individual: updatedFigurapartidoArr,
        figura: sumaFigura,
    };
    editarAsistencias({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `La Figura del partido es ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularGoles = (
    equipoId: string,
    jugadorId: string,
    gol_partido: number,
    index: number,
    jugador_gol: number,
    jugador_name: string,
    goles: number,
    equipo: any,
    golesAFavor: number,
    golPartidoIndividual: number[],
    golPartidoEquipo: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarGol: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedGolpartidoArr = [...golPartidoIndividual];
    let updatedGolpartido = jugador_gol - gol_partido;
    updatedGolpartidoArr[index] = updatedGolpartido;
    let sumaGolesaFavor = golesAFavor - gol_partido
    let updatedGolEquipoArr = [...golPartidoEquipo];
    let updatedGolEquipo = equipo - gol_partido;
    updatedGolEquipoArr[index] = updatedGolEquipo;
    let sumaGoles = goles - gol_partido;
    if (jugador_gol < 1) {
        alertaSubmit(false, 'no puedes anular si no hizo gol aun');
        setIsLoading(false);
        return;
    }
    const formData = {
        gol_partido_individual: updatedGolpartidoArr,
        gol_partido: updatedGolEquipoArr,
        goles: sumaGoles,
        goles_a_Favor: sumaGolesaFavor,
    };
    editarGol({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Gol de ${jugador_name} anulado`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularAsistencia = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_asistencia: number,
    jugador_name: string,
    asistencia: number,
    asistenciaPartidoIndividual: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAsistencias: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedAsistenciapartidoArr = [...asistenciaPartidoIndividual];
    let updatedAsistenciapartido = jugador_asistencia - 1;
    updatedAsistenciapartidoArr[index] = updatedAsistenciapartido;
    let sumaAsistencia = asistencia - 1;
    if (jugador_asistencia < 1) {
        alertaSubmit(false, 'no puedes anular si no hizo asistencia aun');
        setIsLoading(false);
        return;
    }
    const formData = {
        asistencia_partido_individual: updatedAsistenciapartidoArr,
        asistencias: sumaAsistencia,
    };
    editarAsistencias({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Asistencia de ${jugador_name} anulada`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularAmarilla = (
    equipoId: string,
    jugadorId: string,
    amarilla_partido: number,
    index: number,
    jugador_amarilla: number,
    jugador_name: string,
    amarillas: number,
    amarillasAFavor: number,
    amarillaPartidoIndividual: number[],
    rojaPartidoIndividual: number[],
    jugador_roja: number,
    rojasAFavor: number,
    rojas: number,
    suspendidoJugador: string,
    suspendidoNumero: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAmarillas: any,
    queryClient: QueryClient,
    tarjetasAcumuladas: number
) => {
    setIsLoading(true);
    let updatedAmarillaspartidoArr = [...amarillaPartidoIndividual];
    let updatedAmarillapartido = jugador_amarilla - amarilla_partido;
    updatedAmarillaspartidoArr[index] = updatedAmarillapartido;
    let restaAmarillasaFavor = amarillasAFavor - amarilla_partido;
    let restaAmarillas = amarillas - amarilla_partido;

    let updateRojaPartidoArr = [...rojaPartidoIndividual];
    let updatedRojapartido =
        updatedAmarillaspartidoArr[index] === 2 ? jugador_roja -= 1 : jugador_roja;
    updateRojaPartidoArr[index] = updatedRojapartido;

    let restarRojasaFavor =
        updatedAmarillaspartidoArr[index] === 2 ? rojasAFavor -= 1 : rojasAFavor;
    let restarRojas =
        updatedAmarillaspartidoArr[index] === 2 ? rojas -= 1 : rojas;
    let restarSuspencion =
        updatedAmarillaspartidoArr[index] === 2 ? suspendidoNumero -= 1 : suspendidoNumero;

    let suspenderJugador = "No";

    if (jugador_amarilla < 1) {
        alertaSubmit(false, 'no puedes anular si no tiene tarjeta amarilla');
        setIsLoading(false);
        return;
    }
    let acumulada = tarjetasAcumuladas - amarilla_partido

    const formData = {
        amarilla_partido_individual: updatedAmarillaspartidoArr,
        tarjetas_amarillas: restaAmarillas,
        tarjetasAmarillas: restaAmarillasaFavor,
        roja_partido_individual: updateRojaPartidoArr,
        tarjetas_roja: restarRojas,
        tarjetasRojas: restarRojasaFavor,
        suspendido_numero: restarSuspencion,
        suspendido: suspenderJugador,
        tarjetas_acumuladas: acumulada
    };

    editarAmarillas({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Tarjeta amarilla anulada para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularRoja = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_roja: number,
    jugador_name: string,
    rojas: number,
    rojasAFavor: number,
    rojaPartidoIndividual: number[],
    suspendidoNumero: number,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarRojas: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedRojaspartidoArr = [...rojaPartidoIndividual];
    let updatedRojapartido = jugador_roja - 1;
    updatedRojaspartidoArr[index] = updatedRojapartido;
    let restaRojasaFavor = rojasAFavor - 1;
    let restaRojas = rojas - 1;
    let restarSuspencion = suspendidoNumero - 1;
    if (jugador_roja < 1) {
        alertaSubmit(false, 'no puedes anular si no tiene tarjeta roja');
        setIsLoading(false);
        return;
    }
    const formData = {
        roja_partido_individual: updatedRojaspartidoArr,
        tarjetas_roja: restaRojas,
        tarjetasRojas: restaRojasaFavor,
        suspendido_numero: restarSuspencion,
        suspendido: 'No',
    };
    editarRojas({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Anular tarjeta roja para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularAzul = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_azul: number,
    jugador_name: string,
    azul: number,
    azulPartidoIndividual: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAzules: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedAzulpartidoArr = [...azulPartidoIndividual];
    let updatedAzulpartido = jugador_azul - 1;
    updatedAzulpartidoArr[index] = updatedAzulpartido;
    let sumaAzul = azul - 1;
    if (jugador_azul < 1) {
        alertaSubmit(false, 'no puedes anular si no tiene tarjeta azul');
        setIsLoading(false);
        return;
    }
    const formData = {
        azul_partido_individual: updatedAzulpartidoArr,
        tarjetas_azul: sumaAzul,
    };
    editarAzules({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Anular tarjeta azul para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularFigura = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_figura: number,
    jugador_name: string,
    figura: number,
    figuraPartidoIndividual: number[],
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarAsistencias: any,
    queryClient: QueryClient,
) => {
    setIsLoading(true);
    let updatedFigurapartidoArr = [...figuraPartidoIndividual];
    let updatedFigurapartido = jugador_figura - 1;
    updatedFigurapartidoArr[index] = updatedFigurapartido;
    let sumaFigura = figura - 1;
    if (jugador_figura < 1) {
        alertaSubmit(false, 'no puedes anular si no fue seleccionado como jugador figura');
        setIsLoading(false);
        return;
    }
    const formData = {
        jugador_figura_individual: updatedFigurapartidoArr,
        figura: sumaFigura,
    };
    editarAsistencias({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `${jugador_name} ya no es la figura del partido`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};


export const editarValorMercado = (
    equipoId: string,
    jugadorId: string,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>,
    editarPartidos: any,
    queryClient: QueryClient,
    jugador: any,
    index: number
) => {
    setIsLoading(true);

    let partidos = jugador.partidos_individual[index];
    let clausula = jugador.clausula;
    let valor_mercado = jugador.valor_mercado;
    let gol = jugador.gol_partido_individual[index];
    let amarilla = jugador.amarilla_partido_individual[index];
    let roja = jugador.roja_partido_individual[index];
    let azul = jugador.azul_partido_individual[index];
    let asistencia = jugador.asistencia_partido_individual[index];
    let figura = jugador.jugador_figura_individual[index];
    let edad = jugador.edad;
    let capitan = jugador.capitan;
    let posicion = jugador.posicion;
    let sueldoCalculo = jugador.sueldoCalculo;
    let lesion = jugador.lesion;

    let clausulaAumento = 0;
    let clausulaDisminucion = 0;
    let valorMercadoAumento = 0;
    let sueldoCalculoAumento = 0;

    //SI TIENE MENOS DE 18 AÑOS
    if (partidos === 'Si' && edad < 18) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.01;
                valorMercadoAumento = 0.015;
                sueldoCalculoAumento = 0.01;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.01;
                valorMercadoAumento = 0.025;
                sueldoCalculoAumento = 0.015;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.055;
                valorMercadoAumento = 0.085;
                sueldoCalculoAumento = 0.075;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.08;
                sueldoCalculoAumento = 0.08;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.02;
                valorMercadoAumento = 0.025;
                sueldoCalculoAumento = 0.036;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.02;
                valorMercadoAumento = 0.025;
                sueldoCalculoAumento = 0.045;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.07;
                sueldoCalculoAumento = 0.07;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.20;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.20;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 20 AÑOS
    } else if (partidos === 'Si' && edad < 20) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.02;
                valorMercadoAumento = 0.03;
                sueldoCalculoAumento = 0.035;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.02;
                valorMercadoAumento = 0.035;
                sueldoCalculoAumento = 0.035;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.04;
                sueldoCalculoAumento = 0.04;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.025;
                valorMercadoAumento = 0.035;
                sueldoCalculoAumento = 0.035;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.025;
                valorMercadoAumento = 0.035;
                sueldoCalculoAumento = 0.045;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.04;
                valorMercadoAumento = 0.055;
                sueldoCalculoAumento = 0.055;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.035;
                sueldoCalculoAumento = 0.035;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.055;
                sueldoCalculoAumento = 0.065;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.075;
                sueldoCalculoAumento = 0.075;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 22 AÑOS
    } else if (partidos === 'Si' && edad < 22) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.045;
                sueldoCalculoAumento = 0.045;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.045;
                sueldoCalculoAumento = 0.055;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.08;
                sueldoCalculoAumento = 0.08;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.035;
                valorMercadoAumento = 0.055;
                sueldoCalculoAumento = 0.55;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.035;
                valorMercadoAumento = 0.055;
                sueldoCalculoAumento = 0.065;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.09;
                sueldoCalculoAumento = 0.09;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.04;
                valorMercadoAumento = 0.075;
                sueldoCalculoAumento = 0.075;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.045;
                valorMercadoAumento = 0.085;
                sueldoCalculoAumento = 0.085;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 24 AÑOS
    } else if (partidos === 'Si' && edad < 24) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.04;
                valorMercadoAumento = 0.065;
                sueldoCalculoAumento = 0.065;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.04;
                valorMercadoAumento = 0.065;
                sueldoCalculoAumento = 0.075;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.8;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.085;
                sueldoCalculoAumento = 0.085;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.085;
                sueldoCalculoAumento = 0.085;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.095;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.15;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 26 AÑOS
    } else if (partidos === 'Si' && edad < 26) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.08;
                sueldoCalculoAumento = 0.08;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.08;
                sueldoCalculoAumento = 0.085;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.09;
                sueldoCalculoAumento = 0.09;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.095;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.8;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 28 AÑOS
    } else if (partidos === 'Si' && edad < 28) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.099;
                sueldoCalculoAumento = 0.099;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.099;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.18;
                sueldoCalculoAumento = 0.18;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 30 AÑOS
    } else if (partidos === 'Si' && edad < 30) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.015;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.30;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 32 AÑOS
    } else if (partidos === 'Si' && edad < 32) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.010;
                sueldoCalculoAumento = 0.010;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.010;
                sueldoCalculoAumento = 0.015;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 34 AÑOS
    } else if (partidos === 'Si' && edad < 34) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.095;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.12;
                sueldoCalculoAumento = 0.12;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.18;
                sueldoCalculoAumento = 0.18;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 36 AÑOS
    } else if (partidos === 'Si' && edad < 36) {
        if (gol === 1 || asistencia === 1) {
            clausulaAumento = 0.05;
            valorMercadoAumento = 0.085;
            sueldoCalculoAumento = 0.085;
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            clausulaAumento = 0.06;
            valorMercadoAumento = 0.085;
            sueldoCalculoAumento = 0.085;
        } else if (gol >= 5 || asistencia >= 5) {
            clausulaAumento = 0.07;
            valorMercadoAumento = 0.10;
            sueldoCalculoAumento = 0.10;
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 38 AÑOS
    } else if (partidos === 'Si' && edad < 38) {
        if (gol === 1 || asistencia === 1) {
            clausulaAumento = 0.04;
            valorMercadoAumento = 0.075;
            sueldoCalculoAumento = 0.075;
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            clausulaAumento = 0.06;
            valorMercadoAumento = 0.095;
            sueldoCalculoAumento = 0.095;
        } else if (gol >= 5 || asistencia >= 5) {
            clausulaAumento = 0.07;
            valorMercadoAumento = 0.10;
            sueldoCalculoAumento = 0.10;
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 40 AÑOS
    } else if (partidos === 'Si' && edad < 40) {
        if (gol === 1 || asistencia === 1) {
            clausulaAumento = 0.03;
            valorMercadoAumento = 0.065;
            sueldoCalculoAumento = 0.065;
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            clausulaAumento = 0.04;
            valorMercadoAumento = 0.075;
            sueldoCalculoAumento = 0.075;
        } else if (gol >= 5 || asistencia >= 5) {
            clausulaAumento = 0.05;
            valorMercadoAumento = 0.095;
            sueldoCalculoAumento = 0.095;
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
    } else {
        clausulaAumento = 0;
        valorMercadoAumento = 0;
        sueldoCalculoAumento = 0;
    }

    if (partidos === 'No' && edad < 18) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.10;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 20) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.10;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 22) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.095;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 24) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.09;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 26) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.085;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 28) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.08;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 30) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.075;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 32) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.07;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 34) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.065;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 36) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.06;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 38) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.055;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 40) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.05;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else {
        clausulaDisminucion = 0;
    }

    const nuevaClausula = partidos === 'Si' ? clausula * (1 + clausulaAumento) : clausula * (1 - clausulaDisminucion);
    const clausulaRedondeada = Math.round(nuevaClausula);

    const nuevaMercadoValor = (roja === 1 || amarilla >= 1) ? valor_mercado * (1 - valorMercadoAumento) : valor_mercado * (1 + valorMercadoAumento);
    const MercadoRedondeado = Math.round(nuevaMercadoValor);

    const nuevaCalculoAumento = (roja === 1 || amarilla >= 1) ? sueldoCalculo * (1 - sueldoCalculoAumento) : sueldoCalculo * (1 + sueldoCalculoAumento)
    const CalculoAumentoRedondeado = Math.round(nuevaCalculoAumento);


    const formData = {
        sueldoCalculo: CalculoAumentoRedondeado,
        valor_mercado: MercadoRedondeado,
        clausula: clausulaRedondeada,
    }

    editarPartidos({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success: any) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, `Se modificaron jugadores su valor en el mercado!`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};
