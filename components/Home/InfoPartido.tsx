import { CircularProgress, Grid, Paper, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ButtonStatus } from "../Calendario/ButtonStatus";
import { status } from "@/utils";
import Context from "@/context/contextPrincipal";
import moment from "moment";

export const InfoPartido = ({ homeTeam, awayTeam, currentRound, isLoading }: { homeTeam: any; awayTeam: any; currentRound: number, isLoading: boolean; }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [hoy, setHoy] = useState(moment())
    const [minutosTranscurridos, setMinutosTranscurridos] = useState(0);
    const [showImage, setShowImage] = useState(false);
    const fecha_home = homeTeam?.fecha[currentRound];
    const arbitro_home = homeTeam?.arbitro[currentRound];
    const formatoFecha = moment(fecha_home, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    const formatoHora = moment(fecha_home, 'YYYY-MM-DD HH:mm:ss').format('HH:mm a');
    const gol_home = homeTeam?.gol_partido[currentRound];
    const gol_away = awayTeam?.gol_partido[currentRound];
    const fechaBD = moment(fecha_home, 'YYYY-MM-DD HH:mm:ss')
    const TIEMPO_PARTIDO = 55;
    const tiempoRestante = fechaBD.diff(hoy, 'minutes') + TIEMPO_PARTIDO;
    const fechaFinalPartido = fechaBD.clone().add(TIEMPO_PARTIDO, 'minutes');

    useEffect(() => {
        const timer = setInterval(() => {
            setHoy(moment());
        }, 5000);
        return () => {
            clearInterval(timer);
        };
    }, [hoy]);

    useEffect(() => {
        const tiempoRestante = fechaBD.diff(hoy, "minutes") + TIEMPO_PARTIDO;
        const minutos = TIEMPO_PARTIDO - tiempoRestante;
        setMinutosTranscurridos(minutos);
    }, [hoy]);

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    return (
        <Paper elevation={3} sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)',  }}>
            <Grid item container sx={{ color: light ? 'var(--dark2)' : 'var(--gris2)', width:  "350px" }}>
                <Grid item container alignItems={'center'} justifyContent={'center'}>
                    Jornada {currentRound + 1}
                </Grid>
                <Grid item container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Grid item sx={{ fontSize: '16px' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definido' : formatoFecha}</Grid>
                    <Grid item sx={{ fontSize: '12px' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definida' : formatoHora}</Grid>
                </Grid>
                <Grid item container alignItems={'center'} justifyContent={'center'}>
                    <Grid item container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} lg={4} md={4} xs={4}>
                        {isLoading || !showImage ?
                            (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                            : showImage ? <img style={{ height: '60px' }} src={homeTeam?.logo} alt={homeTeam?.name} />
                                : null}
                        <Grid item sx={{ fontSize: '14px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>{homeTeam?.name}</Grid>
                    </Grid>
                    <Grid item >
                        <ButtonStatus status={status(hoy, fechaFinalPartido, tiempoRestante, TIEMPO_PARTIDO)} gol_away={gol_away} gol_home={gol_home} minutosTranscurridos={minutosTranscurridos} />
                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ fontSize: '7px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>Arbitro:</Grid>
                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ fontSize: '6px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>{arbitro_home}</Grid>
                    </Grid>
                    <Grid item container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} lg={4} md={4} xs={4}>
                        {isLoading || !showImage ?
                            (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                            : showImage ? <img style={{ height: '60px' }} src={awayTeam?.logo} alt={awayTeam?.name} />
                                : null}
                        <Grid item sx={{ fontSize: '14px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>{awayTeam?.name}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}