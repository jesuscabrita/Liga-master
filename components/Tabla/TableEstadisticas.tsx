import { Avatar, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { ModalJugadorInfo } from "../Modals/Jugadores/ModalInfoJugador";
import { getEstadisticaKey, seleccionarData, stringAvatar } from "@/utils";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { TableEstadisticasProps } from "@/interfaces";
import StyledTableCell from "../Shared/StyledTableCell";
import StyledTableRow from "../Shared/StyledTableRow";
import Context from "@/context/contextPrincipal";

export const TableEstadisticas: React.FC<TableEstadisticasProps> = ({ data, SubTitle, nameEstadistida, titleTable }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const router = useRouter()
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const estadisticaKey = getEstadisticaKey(nameEstadistida);

    const filterName = (name: string) => {
        const newFilter = data?.filter(data => data.name === name);
        return newFilter;
    }

    const jugadoresData = (data: any[], cantidad: number, estadisticaKey: string) => {
        return data
            .flatMap((equipo) => equipo.jugadores)
            .filter((jugador) => jugador.libre === "No" && jugador.inscrito === 'Si')
            .sort((a, b) => b[estadisticaKey] - a[estadisticaKey])
            .slice(0, cantidad);
    };

    return (
        <Grid item container>
            {estadisticaKey && jugadoresData(data, 10, estadisticaKey)?.length === 0 ?
                <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                    <Vacio size={140} />
                    {`No hay jugadores en ${titleTable}`}
                </Grid>
                :
                <Grid item container>
                    <Grid item container mb={1} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                        {`${nameEstadistida} en  ${titleTable}`}
                        <span style={{ fontSize: '14px', fontWeight: '400' }}>{SubTitle}</span>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell light={light} align="center">Nombre</StyledTableCell>
                                    <StyledTableCell light={light} align="center">Equipo</StyledTableCell>
                                    <StyledTableCell light={light} align="center">{nameEstadistida}</StyledTableCell>
                                    <StyledTableCell light={light} align="center" style={{ whiteSpace: 'nowrap' }}>{'PJ'}</StyledTableCell>
                                    <StyledTableCell light={light} align="center" style={{ whiteSpace: 'nowrap' }}>{mobile ? 'GP' : 'Promedio'}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                {estadisticaKey && jugadoresData(data, 10, estadisticaKey).map((jugador, index) => {
                                    const estadistica = jugador[estadisticaKey];
                                    const promedio: string = (estadistica / jugador.partidos).toFixed(2);
                                    const promedioNumber = parseFloat(promedio);
                                    const promedioFormatted = isNaN(promedioNumber) ? '-' : promedioNumber.toFixed(2);
                                    return (
                                        <StyledTableRow light={light} key={jugador._id}>
                                            <StyledTableCell light={light} component="th" scope="row">
                                                <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: !mobile ? '250px' : '100%', whiteSpace: 'nowrap' }}>
                                                    <Grid container sx={{ gap: '8px', alignItems: 'center', whiteSpace: 'nowrap', width: '40px' }}>
                                                        <Grid>{index + 1}</Grid>
                                                        {(index + 1 == 1) &&
                                                            <Grid sx={{ background: 'var(--check)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                    </Grid>
                                                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                        <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} />
                                                    </Grid>
                                                    <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: !mobile ? '110px' : '100px', cursor: 'pointer', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                        {jugador.name}
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="center">
                                                <Grid sx={{ display: 'flex', alignItems: 'center', gap: '18px' }} >
                                                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px', cursor: 'pointer' }} onClick={() => { router.push(`/manager/${filterName(jugador.equipo)[0]._id}`) }}>
                                                        <img src={jugador.logo} alt='.' style={{ height: '35px' }} />
                                                    </Grid>
                                                    {!mobile &&
                                                        <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px', cursor: 'pointer', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500' }} onClick={() => { router.push(`/manager/${filterName(jugador.equipo)[0]._id}`) }}>
                                                            {jugador.equipo}
                                                        </Grid>}
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="center" style={{ fontWeight: 700, fontSize: '15px' }}>
                                                {estadistica}
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="center" >{jugador.partidos}</StyledTableCell>
                                            {<StyledTableCell light={light} align="center">{promedioFormatted}</StyledTableCell>}
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            }
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
        </Grid>
    )
}