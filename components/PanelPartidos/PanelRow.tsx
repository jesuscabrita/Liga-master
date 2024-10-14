import { CircularProgress, Collapse, Grid, IconButton, useMediaQuery } from "@mui/material";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp as ArrowUp } from "react-icons/md";
import { BsFillStarFill as Figura } from 'react-icons/bs';
import { ButtonStatus } from "../Calendario/ButtonStatus";
import { LoadingScreen } from "../Shared/LoadingScreen";
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { ModalLista } from "../Modals/Panel/ModalLista";
import { useContext, useEffect, useState } from "react";
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { CalcularPartido } from "./CalcularPartido";
import { AccionesEquipo } from "./AccionesEquipo";
import { AnularAction } from "./AnularAction";
import { AddAction } from "./AddAction";
import { status } from "@/utils";
import Context from "@/context/contextPrincipal";
import moment from "moment";

export const PanelRow = ({ homeTeam, awayTeam, currentRound, isLoading, index, data }: { homeTeam: any; awayTeam: any; currentRound: any; isLoading: any; index: number; data: any }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [showImage, setShowImage] = useState(false);
    const [open, setOpen] = useState(false);
    const [hoy, setHoy] = useState(moment())
    const [minutosTranscurridos, setMinutosTranscurridos] = useState(0);
    const fecha_home = homeTeam?.fecha[currentRound];
    const formatoFecha = moment(fecha_home, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    const formatoHora = moment(fecha_home, 'YYYY-MM-DD HH:mm:ss').format('HH:mm a');
    const gol_home = homeTeam?.gol_partido[currentRound];
    const gol_away = awayTeam?.gol_partido[currentRound];
    const fechaBD = moment(fecha_home, 'YYYY-MM-DD HH:mm:ss')
    const TIEMPO_PARTIDO = 55;
    const tiempoRestante = fechaBD.diff(hoy, 'minutes') + TIEMPO_PARTIDO;
    const fechaFinalPartido = fechaBD.clone().add(TIEMPO_PARTIDO, 'minutes');
    const [isLoadinng, setIsLoadinng] = useState(false);
    const [modalLista, setModalLista] = useState(false);
    const [modalListaAway, setModalListaAway] = useState(false);

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
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    const filterPartido = (array: any[], partido: string, index: string | number) => {
        const newFilter = array?.filter((data) => data.partidos_individual[index] === partido);
        return newFilter;
    };

    return (
        <>
            <Grid item gap={!mobile ? 4 : 0} sx={{ padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', borderBottom: '1px solid var(--danger)', background: light ? 'var(--gris3)' : 'var(--dark4)' }}>
                <Grid item>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ color: light ? 'black' : 'var(--cero)' }}>
                        {open ? <ArrowUp /> : <ArrowDown />}
                    </IconButton>
                </Grid>
                <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    <Grid item width={!mobile ? '110px' : '80px'} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Grid item sx={{ fontSize: !mobile ? '16px' : '12px' }}>Partido {index + 1}</Grid>
                        <Grid item sx={{ fontSize: !mobile ? '16px' : '10px' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definido' : formatoFecha}</Grid>
                        <Grid item sx={{ fontSize: !mobile ? '12px' : '9px' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definida' : formatoHora}</Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: !mobile ? '470px' : '180px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    {!mobile &&
                        <Grid item container alignItems={'center'} justifyContent={'end'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                            {homeTeam?.name}
                        </Grid>}
                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                        {isLoading || !showImage ?
                            (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                            : showImage ? <img style={{ height: '30px' }} src={homeTeam?.logo} alt={homeTeam?.name} />
                                : null}
                    </Grid>
                    <Grid item>
                        <ButtonStatus status={status(hoy, fechaFinalPartido, tiempoRestante, TIEMPO_PARTIDO)} gol_away={gol_away} gol_home={gol_home} minutosTranscurridos={minutosTranscurridos} />
                    </Grid>
                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                        {isLoading || !showImage ?
                            (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                            : showImage ? <img style={{ height: '30px' }} src={awayTeam?.logo} alt={awayTeam?.name} />
                                : null}
                    </Grid>
                    {!mobile &&
                        <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                            {awayTeam?.name}
                        </Grid>}
                </Grid>
            </Grid>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', width: '100%' }}>
                <Grid item p={mobile ? 2 : 5}>
                    <Grid item mb={2}>
                        <CalcularPartido
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            currentRound={currentRound}
                            setIsLoadinng={setIsLoadinng}
                            data={data}
                        />
                    </Grid>
                    <Grid container gap={6}>
                        <Grid item>
                            <AccionesEquipo
                                team={homeTeam}
                                currentRound={currentRound}
                                modal={modalLista}
                                setModal={setModalLista}
                                setIsLoadinng={setIsLoadinng}
                            />
                            <Grid mb={2} item sx={{ background: 'var(--primario)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cero)', padding: '2px' }}>{homeTeam?.name}</Grid>
                            {filterPartido(homeTeam?.jugadores, 'Si', currentRound).map((jugador, index) => {
                                return (
                                    <>
                                        <Grid mt={1} item gap={mobile ? 0 : 2} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)', display: 'flex', flexDirection: !mobile ? 'row' : 'column', alignItems: 'center', background: jugador.suspendido === 'Si' ? 'var(--danger2)' : jugador.azul_partido_individual[currentRound] === 1 ? 'var(--primario2)' : jugador.amarilla_partido_individual[currentRound] === 1 ? 'var(--warnning2)' : '', borderRadius: '8px' }}>
                                            <Grid item sx={{ display: 'flex', gap: '8px' }}>
                                                <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: mobile ? '20px' : '40px', fontWeight: 600 }}>#{jugador.dorsal}</Grid>
                                                <Grid item sx={{ width: !mobile ? '250px' : '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: mobile ? 'center' : '', fontSize: mobile ? '12px' : '15px', whiteSpace: 'nowrap' }}>
                                                    {jugador.name}
                                                    {jugador.jugador_figura_individual[currentRound] === 1 && <Figura style={{ color: 'var(--warnning)' }} />}
                                                    {jugador.amarilla_partido_individual[currentRound] >= 1 &&
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.amarilla_partido_individual[currentRound]}</Grid>
                                                            <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        </Grid>}
                                                    {jugador.roja_partido_individual[currentRound] >= 1 && <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />}
                                                    {jugador.azul_partido_individual[currentRound] >= 1 && <Grid sx={{ background: 'var(--primario)', height: '13px', width: '9px', borderRadius: '2px' }} />}
                                                    {jugador.asistencia_partido_individual[currentRound] >= 1 &&
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.asistencia_partido_individual[currentRound]}</Grid>
                                                            <Asistir color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        </Grid>}
                                                    {jugador.gol_partido_individual[currentRound] >= 1 &&
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.gol_partido_individual[currentRound]}</Grid>
                                                            <Gol color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        </Grid>}
                                                </Grid>
                                            </Grid>
                                            <Grid mt={mobile ? -1 : 0} item container flexDirection={'column'} alignItems={'center'}>
                                                <AddAction
                                                    team={homeTeam}
                                                    jugador={jugador}
                                                    currentRound={currentRound}
                                                    index={index}
                                                    setIsLoadinng={setIsLoadinng}
                                                />
                                                <AnularAction
                                                    team={homeTeam}
                                                    jugador={jugador}
                                                    currentRound={currentRound}
                                                    index={index}
                                                    setIsLoadinng={setIsLoadinng}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ borderTop: light ? '1px solid var(--dark3)' : '1px solid var(--cero)' }}></Grid>
                                    </>
                                )
                            })}
                        </Grid>
                        <Grid item>
                            <AccionesEquipo
                                team={awayTeam}
                                currentRound={currentRound}
                                modal={modalListaAway}
                                setModal={setModalListaAway}
                                setIsLoadinng={setIsLoadinng}
                            />
                            <Grid mb={2} item sx={{ background: 'var(--check)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cero)', padding: '2px' }}>{awayTeam?.name}</Grid>
                            {filterPartido(awayTeam?.jugadores, 'Si', currentRound).map((jugador, index) => {
                                return (
                                    <>
                                        <Grid mt={1} item gap={mobile ? 0 : 2} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)', display: 'flex', flexDirection: !mobile ? 'row' : 'column', alignItems: 'center', background: jugador.suspendido === 'Si' ? 'var(--danger2)' : jugador.azul_partido_individual[currentRound] === 1 ? 'var(--primario2)' : jugador.amarilla_partido_individual[currentRound] === 1 ? 'var(--warnning2)' : '', borderRadius: '8px' }}>
                                            <Grid item sx={{ display: 'flex', gap: '8px' }}>
                                                <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: mobile ? '20px' : '40px', fontWeight: 600 }}>#{jugador.dorsal}</Grid>
                                                <Grid item sx={{ width: !mobile ? '250px' : '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: mobile ? 'center' : '', fontSize: mobile ? '12px' : '15px', whiteSpace: 'nowrap' }}>
                                                    {jugador.name}
                                                    {jugador.jugador_figura_individual[currentRound] === 1 && <Figura style={{ color: 'var(--warnning)' }} />}
                                                    {jugador.amarilla_partido_individual[currentRound] >= 1 &&
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.amarilla_partido_individual[currentRound]}</Grid>
                                                            <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        </Grid>}
                                                    {jugador.roja_partido_individual[currentRound] >= 1 && <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />}
                                                    {jugador.azul_partido_individual[currentRound] >= 1 && <Grid sx={{ background: 'var(--primario)', height: '13px', width: '9px', borderRadius: '2px' }} />}
                                                    {jugador.asistencia_partido_individual[currentRound] >= 1 &&
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.asistencia_partido_individual[currentRound]}</Grid>
                                                            <Asistir color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        </Grid>}
                                                    {jugador.gol_partido_individual[currentRound] >= 1 &&
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.gol_partido_individual[currentRound]}</Grid>
                                                            <Gol color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        </Grid>}
                                                </Grid>
                                            </Grid>
                                            <Grid mt={mobile ? -1 : 0} item container flexDirection={'column'} alignItems={'center'}>
                                                <AddAction
                                                    team={awayTeam}
                                                    jugador={jugador}
                                                    currentRound={currentRound}
                                                    index={index}
                                                    setIsLoadinng={setIsLoadinng}
                                                />
                                                <AnularAction
                                                    team={awayTeam}
                                                    jugador={jugador}
                                                    currentRound={currentRound}
                                                    index={index}
                                                    setIsLoadinng={setIsLoadinng}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ borderTop: light ? '1px solid var(--dark3)' : '1px solid var(--cero)' }}></Grid>
                                    </>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Collapse>
            {isLoadinng && <LoadingScreen />}
            {modalLista && <ModalLista open={modalLista} setOpen={setModalLista} data={homeTeam} currentRound={currentRound} />}
            {modalListaAway && <ModalLista open={modalListaAway} setOpen={setModalListaAway} data={awayTeam} currentRound={currentRound} />}
        </>
    )
}