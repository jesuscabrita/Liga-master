import { Match, RowType, Team } from "@/interfaces";
import moment from "moment";

export const status = (hoy: moment.Moment, fechaFinalPartido: moment.Moment, tiempoRestante: number, TIEMPO_PARTIDO: number) => {
    if (hoy.diff(fechaFinalPartido, 'days') === 0) {
        const enVivo = tiempoRestante <= TIEMPO_PARTIDO && tiempoRestante > 0
        if (enVivo) {
            return 'enVivo'
        } else if (tiempoRestante <= 0) {
            return 'finPartido'
        } else {
            return 'agendar'
        }
    } else if (hoy.diff(fechaFinalPartido, 'days') < 0) {
        return 'noEmpezado'
    }
    else if (!hoy.diff(fechaFinalPartido, 'days')) {
        return 'fechaInvalida'
    } else {
        return 'finPartido'
    }
}

export const generateCalendar = (data: Team[]): Match[][] => {
    const numTeams = data.length;
    const numRounds = numTeams - 1;
    const matchesPerRound = numTeams / 2;
    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

    const newMatches: Match[][] = [];
    for (let round = 0; round < numRounds; round++) {
        const roundMatches: Match[] = [];

        for (let match = 0; match < matchesPerRound; match++) {
            const homeTeamIndex = (round + match) % (numTeams - 1);
            const awayTeamIndex = (numTeams - 1 - match + round) % (numTeams - 1);

            if (match === 0) {
                roundMatches.push({
                    homeTeam: sortedData[numTeams - 1]._id,
                    awayTeam: sortedData[homeTeamIndex]._id,
                    fecha: sortedData[numTeams - 1].fecha,
                });
            } else {
                roundMatches.push({
                    homeTeam: sortedData[homeTeamIndex]._id,
                    awayTeam: sortedData[awayTeamIndex]._id,
                    fecha: sortedData[homeTeamIndex].fecha,
                });
            }
        }

        roundMatches.sort((a, b) => {
            const dateA = new Date(a.fecha);
            const dateB = new Date(b.fecha);
            return dateA.getTime() - dateB.getTime();
        });
        newMatches.push(roundMatches);
    }
    return newMatches;
};

export const isToday = (fechasPartido: any) => {
    const today = new Date().toDateString();
    return fechasPartido.some((fecha: string | number | Date) => {
        if (fecha === 'No definido') return false;
        const partidoDate = new Date(fecha).toDateString();
        return partidoDate === today;
    });
};

const stringToColor = (string: string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string?.length; i += 1) {
        hash = string?.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

export const stringAvatar = (name: string) => {
    const nameParts = name?.split(' ');

    let children = '';
    if (nameParts?.length >= 2) {
        children = `${nameParts[0][0]}${nameParts[1][0]}`;
    } else if (nameParts?.length === 1) {
        children = nameParts[0][0];
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: children,
    };
}

export const filterJugadoresEquipoAnterior = (data: any[], id_equipo_anterior: string) => {
    const equipoId = data?.find((equipo: any) => equipo._id == id_equipo_anterior);
    return equipoId
}

export const filterOfertas = (data: any) => {
    const newFilter = data?.oferta.filter((ofert: { respuesta: string; }) => ofert.respuesta != "Rechazar_prestamo" && ofert.respuesta != 'Negociar_oferta' && ofert.respuesta != 'Aceptar_prestamo' && ofert.respuesta != 'Aceptar_oferta')
    return newFilter;
}

export const filterEmail = (array: any[], user: { email: string }) => {
    const newFilter = array.filter(data => data.correo == user?.email);
    return newFilter;
}

export const filterEstado = (array: any[], estado: string) => {
    const newFilter = array?.filter(data => data.estado == estado);
    return newFilter;
}

export const filterLibreJugador = (array: any[], estado: string) => {
    const newFilter = array?.filter(data => data.libre == estado);
    return newFilter;
}

export const filterLibreJugadorData = (array: any[], estado: string) => {
    const newFilter = array?.filter(data => data.libre == estado && data.inscrito === 'Si');
    return newFilter;
}

export const decodeToken = (token: any) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export const seleccionarData = (
    data: any,
    setDataSeleccion: React.Dispatch<React.SetStateAction<any>>,
    setModalData: React.Dispatch<React.SetStateAction<any>>
) => {
    setDataSeleccion(data);
    setModalData(true);
}

export const formatoPesosArgentinos = (valor: number) => {
    let formato = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });
    return formato.format(valor);
}

export const ordenPosition = (data: any[]) => {
    const orden = [...data]?.sort((a, b) => {
        if (a.puntos > b.puntos) {
            return -1;
        } else if (a.puntos < b.puntos) {
            return 1;
        } else if (a.diferencia_de_Goles > b.diferencia_de_Goles) {
            return -1;
        } else if (a.diferencia_de_Goles < b.diferencia_de_Goles) {
            return 1;
        } else if (a.tarjetasAmarillas < b.tarjetasAmarillas) {
            return -1;
        } else if (a.tarjetasAmarillas > b.tarjetasAmarillas) {
            return 1;
        } else {
            return 0;
        }
    });
    return orden;
};

export const nameTemporadas = (jugador: any) => {
    const contratosRestantes =
        jugador.contrato === 0.5 ? 'Media temporada' :
            jugador.contrato === 1 ? '1 temporada' :
                jugador.contrato === 1.5 ? 'Temporada y media' :
                    jugador.contrato === 2 ? '2 Temporadas' :
                        jugador.contrato === 2.5 ? '2 Temporadas y media' :
                            jugador.contrato === 3 ? '3 Temporadas' :
                                jugador.contrato === 3.5 ? '3 Temporadas y media' :
                                    jugador.contrato === 4 ? '4 Temporadas' :
                                        jugador.contrato === 4.5 ? '4 Temporadas y media' :
                                            jugador.contrato === 5 ? '5 Temporadas'
                                                : ""
    return contratosRestantes
}

export const ordenarJugadores = (jugadores: any[], posicionesOrdenadas: { [x: string]: number; }) => {
    return jugadores?.sort((a, b) => {
        return posicionesOrdenadas[a.posicion] - posicionesOrdenadas[b.posicion];
    });
}

export const calcularPromedio = (jugador: any, partidos: number) => {
    const promedio = (jugador / partidos).toFixed(2);
    const promedioNumber = parseFloat(promedio);
    const promedioFormatted = isNaN(promedioNumber) ? '-' : promedioNumber.toFixed(2);
    return promedioFormatted;
}

export const getLast5ToShow = (row: RowType, maxCount: number): Array<'neutral' | 'win' | 'loss' | 'draw'> => {
    let last5ToShow: Array<'neutral' | 'win' | 'loss' | 'draw'> = [];
    let neutralCount = 0;

    for (let i = row.last5.length - 1; i >= 0; i--) {
        if (row.last5[i] === "neutral") {
            if (neutralCount === 0) {
                last5ToShow = [];
            } else {
                break;
            }
        } else {
            last5ToShow.unshift(row.last5[i]);
            neutralCount++;
            if (neutralCount === maxCount) {
                break;
            }
        }
    }

    while (last5ToShow.length < maxCount) {
        last5ToShow.unshift("neutral");
    }

    return last5ToShow;
};

export const getEstadisticaKey = (nameEstadistida: any) => {
    switch (nameEstadistida) {
        case 'Goles':
            return 'goles';
        case 'Amarillas':
            return 'tarjetas_amarillas';
        case 'Asistencias':
            return 'asistencias';
        case 'Rojas':
            return 'tarjetas_roja';
        default:
            return null;
    }
};
