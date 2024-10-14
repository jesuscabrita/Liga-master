import { jugadoresPut_amarillas, jugadoresPut_asistencias, jugadoresPut_azul, jugadoresPut_figura, jugadoresPut_gol, jugadoresPut_rojas } from "@/services/jugadores";
import { editarAmarilla, editarAsistencia, editarAzul, editarFigura, editarGoles, editarRoja } from "@/lib/panelPartidos";
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { Grid, Tooltip, useMediaQuery } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { BsFillStarFill as Figura } from 'react-icons/bs';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { AddActionProps } from "@/interfaces";
import { useContext } from "react";
import Context from "@/context/contextPrincipal";

export const AddAction: React.FC<AddActionProps> = ({ team, jugador, currentRound, index, setIsLoadinng }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const queryClient = useQueryClient();
    const { mutate: editarGol } = useMutation(jugadoresPut_gol);
    const { mutate: editarAmarillas } = useMutation(jugadoresPut_amarillas);
    const { mutate: editarRojas } = useMutation(jugadoresPut_rojas);
    const { mutate: editarAzules } = useMutation(jugadoresPut_azul);
    const { mutate: editarAsistencias } = useMutation(jugadoresPut_asistencias);
    const { mutate: editarFiguras } = useMutation(jugadoresPut_figura);

    return (
        <Grid item container flexDirection={'row'} alignItems={'center'} gap={mobile ? 2 : 3} p={1} sx={{ borderBottom: light ? '1px solid var(--dark3)' : '1px solid var(--cero)', justifyContent: mobile ? 'center' : '' }}>
            <Tooltip title="Gol" placement="top">
                <Grid item sx={{ cursor: 'pointer', '&:hover': { color: light ? 'var(--neutral)' : 'var(--dark3)' } }}
                    onClick={() => {
                        editarGoles(
                            team._id,
                            jugador._id,
                            1,
                            currentRound,
                            jugador.gol_partido_individual[currentRound],
                            jugador.name,
                            jugador.goles,
                            team.gol_partido[currentRound],
                            team.goles_a_Favor,
                            team.jugadores[index].gol_partido_individual,
                            team.gol_partido,
                            setIsLoadinng,
                            editarGol,
                            queryClient
                        )
                    }}>
                    <Gol />
                </Grid>
            </Tooltip>
            <Tooltip title="Asistencia" placement="top">
                <Grid item sx={{ cursor: 'pointer', '&:hover': { color: light ? 'var(--neutral)' : 'var(--dark3)' } }}
                    onClick={() => {
                        editarAsistencia(
                            team._id,
                            jugador._id,
                            currentRound,
                            jugador.asistencia_partido_individual[currentRound],
                            jugador.name,
                            jugador.asistencias,
                            team.jugadores[index].asistencia_partido_individual,
                            setIsLoadinng,
                            editarAsistencias,
                            queryClient
                        )
                    }}>
                    <Asistir />
                </Grid>
            </Tooltip>
            <Tooltip title="Tarjeta amarilla" placement="top">
                <Grid item sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        editarAmarilla(
                            team._id,
                            jugador._id,
                            1,
                            currentRound,
                            jugador.amarilla_partido_individual[currentRound],
                            jugador.name,
                            jugador.tarjetas_amarillas,
                            team.tarjetasAmarillas,
                            team.jugadores[index].amarilla_partido_individual,
                            team.jugadores[index].roja_partido_individual,
                            jugador.roja_partido_individual[currentRound],
                            team.tarjetasRojas,
                            jugador.tarjetas_roja,
                            jugador.suspendido,
                            jugador.suspendido_numero,
                            setIsLoadinng,
                            editarAmarillas,
                            queryClient,
                            jugador.tarjetas_acumuladas
                        )
                    }}>
                    <Tarjeta color={'var(--warnning)'} />
                </Grid>
            </Tooltip>
            <Tooltip title="Tarjeta roja" placement="top">
                <Grid item sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        editarRoja(
                            team._id,
                            jugador._id,
                            currentRound,
                            jugador.roja_partido_individual[currentRound],
                            jugador.name,
                            jugador.tarjetas_roja,
                            team.tarjetasRojas,
                            team.jugadores[index].roja_partido_individual,
                            jugador.suspendido_numero,
                            setIsLoadinng,
                            editarRojas,
                            queryClient
                        )
                    }}>
                    <Tarjeta color={'var(--danger)'} />
                </Grid>
            </Tooltip>
            <Tooltip title="Tarjeta azul" placement="top">
                <Grid item sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        editarAzul(
                            team._id,
                            jugador._id,
                            currentRound,
                            jugador.azul_partido_individual[currentRound],
                            jugador.name,
                            jugador.tarjetas_azul,
                            team.jugadores[index].azul_partido_individual,
                            setIsLoadinng,
                            editarAzules,
                            queryClient
                        )
                    }}>
                    <Tarjeta color={'var(--primario)'} />
                </Grid>
            </Tooltip>
            <Tooltip title="Jugador figura" placement="top">
                <Grid item sx={{ cursor: 'pointer', '&:hover': { color: light ? 'var(--neutral)' : 'var(--dark3)' } }}
                    onClick={() => {
                        editarFigura(
                            team._id,
                            jugador._id,
                            currentRound,
                            jugador.jugador_figura_individual[currentRound],
                            jugador.name,
                            jugador.figura,
                            team.jugadores[index].jugador_figura_individual,
                            setIsLoadinng,
                            editarFiguras,
                            queryClient
                        )
                    }}>
                    <Figura />
                </Grid>
            </Tooltip>
        </Grid>
    )
}