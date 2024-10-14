import { Avatar, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { seleccionarData, stringAvatar } from "@/utils";
import { useContext, useState } from "react";
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { VscSearchStop as Expulsado } from 'react-icons/vsc';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import StyledTableCell from "../Shared/StyledTableCell";
import StyledTableRow from "../Shared/StyledTableRow";
import Context from "@/context/contextPrincipal";
import { ModalJugadorInfo } from "../Modals/Jugadores/ModalInfoJugador";

interface TablaEstadisticasProps {
    jugadores: {}[];
    goles?: boolean;
    asistencias?: boolean;
    amarillas?: boolean;
    rojas?: boolean;
    label: string;
}

export const TablaEstadisticas: React.FC<TablaEstadisticasProps> = ({
    jugadores,
    label,
    goles,
    asistencias,
    amarillas,
    rojas,
}) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    const filterLibreJugadorData = (array: any[], estado: string) => {
        const newFilter = array?.filter(data => data.libre == estado && data.inscrito === 'Si');
        return newFilter;
    }

    let jugadoresOrdenados;
    if (goles) {
        jugadoresOrdenados = filterLibreJugadorData(jugadores, 'No').sort((a, b) => b.goles - a.goles);
    } else if (asistencias) {
        jugadoresOrdenados = filterLibreJugadorData(jugadores, 'No').sort((a, b) => b.asistencias - a.asistencias);
    } else if (amarillas) {
        jugadoresOrdenados = filterLibreJugadorData(jugadores, 'No').sort((a, b) => b.tarjetas_amarillas - a.tarjetas_amarillas);
    } else if (rojas) {
        jugadoresOrdenados = filterLibreJugadorData(jugadores, 'No').sort((a, b) => b.tarjetas_roja - a.tarjetas_roja);
    } else {
        jugadoresOrdenados = filterLibreJugadorData(jugadores, 'No');
    }

    return (
        <Grid item container>
            {jugadoresOrdenados && jugadoresOrdenados?.length === 0 ?
                <Grid item height={mobile ? "40vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px', textAlign:'center' }}>
                    <Vacio size={140} />
                    No hay jugadores en este equipo
                </Grid>
                :
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell light={light}>
                                    <Grid item sx={{ whiteSpace: 'nowrap' }}>
                                        {label}
                                    </Grid>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                            {jugadoresOrdenados && jugadoresOrdenados.map((jugador, index) => {
                                return (
                                    <StyledTableRow disabled={jugador.inscrito === 'No'} light={light} key={jugador.id} style={{ background: jugador.suspendido === 'Si' ? 'var(--danger2)' : '' }}>
                                        <StyledTableCell light={light} component="th" scope="row">
                                            <Grid container flexDirection={'row'} alignItems={'center'} sx={{ minWidth: jugador.lesion === 'Si' ? '600px' : jugador.capitan === 'Si' ? '480px' : '420px' }}>
                                                <Grid container alignItems={'center'} gap={2} sx={{ whiteSpace: 'nowrap', width: '70px' }}>
                                                    <Grid>{index + 1}</Grid>
                                                    {(jugador.posicion == 'Portero') &&
                                                        <Grid sx={{ color: 'var(--warnning)', fontWeight: 700, fontSize: !mobile ? '15px' : '13px' }}>POR</Grid>}
                                                    {(jugador.posicion == 'Defensa') &&
                                                        <Grid sx={{ color: 'var(--gris2)', fontWeight: 700, fontSize: !mobile ? '15px' : '13px' }}>DEF</Grid>}
                                                    {(jugador.posicion == 'Medio') &&
                                                        <Grid sx={{ color: 'var(--check)', fontWeight: 700, fontSize: !mobile ? '15px' : '13px' }}>MED</Grid>}
                                                    {(jugador.posicion == 'Delantero') &&
                                                        <Grid sx={{ color: 'var(--primario)', fontWeight: 700, fontSize: !mobile ? '15px' : '13px' }}>DEL</Grid>}
                                                </Grid>
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px', cursor: 'pointer', width: '250px' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile ? '30px' : '', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500' }}>
                                                        {jugador.name}
                                                        {jugador.capitan === 'Si' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', height: '20px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px' }}>
                                                                    <img src="/images/capitan.png" alt="capitan" style={{height:'16px'}} />
                                                                </Grid>
                                                            </Grid>}
                                                        {jugador.lesion === 'Si' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <img src="/images/lesion.png" alt="lesion" style={{ height: '16px' }} />
                                                            </Grid>}
                                                        {/* {jugador.tarjetas_acumuladas > 0 && (<Grid item sx={{ display: 'flex', alignItems: 'center' }}>{jugador.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} size={20} /></Grid>)} */}
                                                        {jugador.suspendido === 'Si' && (
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <img src="/images/suspendido.png" alt="suspendido" style={{height:'18px', width:'22px'}} />
                                                                <Grid item ml={-1} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', fontSize: mobile?'10px':'11px' }}>{`(${jugador.jornadas_suspendido})`}</Grid>
                                                            </Grid>)}
                                                    </Grid>
                                                </Grid>
                                                {goles ? (
                                                    <Grid item ml={2} sx={{ fontWeight: index === 0 ? 700 : 500, fontSize: index === 0 ? '18px' : '15px' }}>{jugador.goles}</Grid>
                                                ) : asistencias ? (
                                                    <Grid item ml={2} sx={{ fontWeight: index === 0 ? 700 : 500, fontSize: index === 0 ? '18px' : '15px' }}>{jugador.asistencias}</Grid>
                                                ) : amarillas ? (
                                                    <Grid item ml={2} sx={{ fontWeight: index === 0 ? 700 : 500, fontSize: index === 0 ? '18px' : '15px' }}>{jugador.tarjetas_amarillas}</Grid>
                                                ) : rojas ? (
                                                    <Grid item ml={2} sx={{ fontWeight: index === 0 ? 700 : 500, fontSize: index === 0 ? '18px' : '15px' }}>{jugador.tarjetas_roja}</Grid>
                                                ) : (
                                                    null
                                                )}
                                            </Grid>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
        </Grid>
    )
}