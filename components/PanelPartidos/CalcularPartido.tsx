import { calcularDatosPartido, jugadoresPut_suspencion, jugadoresValor_mercado } from "@/services/jugadores";
import { datosDelPartidoHome, editarSuspencion, editarValorMercado } from "@/lib/panelPartidos";
import { CalcularPartidoProps, forJugadorProps } from "@/interfaces";
import { useMutation, useQueryClient } from "react-query";
import { MdCalculate as Calculo } from 'react-icons/md';
import { ButtomSend } from "../Shared/ButtonSend";
import { Grid, Tooltip } from "@mui/material";

export const CalcularPartido: React.FC<CalcularPartidoProps> = ({ homeTeam, awayTeam, currentRound, setIsLoadinng, data }) => {
    const queryClient = useQueryClient();
    const { mutate: calcularDatosPartidos } = useMutation(calcularDatosPartido);
    const { mutate: editarSuspendido } = useMutation(jugadoresPut_suspencion);
    const { mutate: mercado } = useMutation(jugadoresValor_mercado);

    return (
        <Tooltip title="Calcular los datos del partidos, se recomienda usarlo despues de terminado" placement="top">
            <Grid item lg={3} md={3} xs={12}>
                <ButtomSend
                    title="Calcular Partido"
                    icon={Calculo}
                    handleclick={() => {
                        datosDelPartidoHome(
                            homeTeam._id,
                            homeTeam.partidosJugados,
                            homeTeam.gol_partido[currentRound],
                            awayTeam.gol_partido[currentRound],
                            homeTeam.ganados,
                            homeTeam.empates,
                            homeTeam.perdidos,
                            homeTeam.goles_en_Contra,
                            homeTeam.goles_a_Favor,
                            homeTeam.puntos,
                            homeTeam.last5,
                            currentRound,
                            setIsLoadinng,
                            data,
                            calcularDatosPartidos,
                            queryClient
                        ),
                            datosDelPartidoHome(
                                awayTeam._id,
                                awayTeam.partidosJugados,
                                awayTeam.gol_partido[currentRound],
                                homeTeam.gol_partido[currentRound],
                                awayTeam.ganados,
                                awayTeam.empates,
                                awayTeam.perdidos,
                                awayTeam.goles_en_Contra,
                                awayTeam.goles_a_Favor,
                                awayTeam.puntos,
                                awayTeam.last5,
                                currentRound,
                                setIsLoadinng,
                                data,
                                calcularDatosPartidos,
                                queryClient
                            ),
                            homeTeam?.jugadores.forEach((jugador: forJugadorProps) => {
                                editarSuspencion(
                                    homeTeam._id,
                                    jugador._id,
                                    jugador.suspendido,
                                    jugador.name,
                                    jugador.jornadas_suspendido,
                                    setIsLoadinng,
                                    editarSuspendido,
                                    queryClient,
                                    jugador.tarjetas_acumuladas
                                );
                            }),
                            awayTeam?.jugadores.forEach((jugador: forJugadorProps) => {
                                editarSuspencion(
                                    awayTeam._id,
                                    jugador._id,
                                    jugador.suspendido,
                                    jugador.name,
                                    jugador.jornadas_suspendido,
                                    setIsLoadinng,
                                    editarSuspendido,
                                    queryClient,
                                    jugador.tarjetas_acumuladas
                                );
                            }),
                            homeTeam?.jugadores.forEach((jugador: forJugadorProps) => {
                                editarValorMercado(
                                    homeTeam._id,
                                    jugador._id,
                                    setIsLoadinng,
                                    mercado,
                                    queryClient,
                                    jugador,
                                    currentRound
                                );
                            }),
                            awayTeam?.jugadores.forEach((jugador: forJugadorProps) => {
                                editarValorMercado(
                                    awayTeam._id,
                                    jugador._id,
                                    setIsLoadinng,
                                    mercado,
                                    queryClient,
                                    jugador,
                                    currentRound
                                );
                            })
                    }}
                />
            </Grid>
        </Tooltip>
    )
}