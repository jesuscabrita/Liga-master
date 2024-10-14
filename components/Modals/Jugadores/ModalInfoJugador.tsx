import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { calcularPromedio, filterJugadoresEquipoAnterior, formatoPesosArgentinos, stringAvatar } from "@/utils";
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { BiTransfer as Trasnfer } from 'react-icons/bi';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { BsInstagram as Insta } from 'react-icons/bs';
import { BsTwitter as Twitter } from 'react-icons/bs';
import { ModalJugadorInfoProps } from "@/interfaces";
import { useContext, useState } from "react";
import { IoExit } from "react-icons/io5";
import { fetchEquiposSet } from "@/lib";
import Context from "@/context/contextPrincipal";
import moment from "moment";

export const ModalJugadorInfo: React.FC<ModalJugadorInfoProps> = ({ open, setOpen, jugador }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const formatoFecha = moment(jugador.fecha_nacimiento, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    const formatoFechaCreate = moment(jugador.fecha_inicio, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    const constratos = jugador.contrato === 0.5 && 'de Media temporada' || jugador.contrato === 1 && 'de 1 Temporada' || jugador.contrato === 1.5 && 'de 1 Temporada y media' || jugador.contrato === 2 && 'de 2 Temporadas' || jugador.contrato === 2.5 && 'de 2 Temporadas y media' || jugador.contrato === 3 && 'de 3 Temporadas' || jugador.contrato === 3.5 && 'de 3 Temporadas y media' || jugador.contrato === 4 && 'de 4 Temporadas' || jugador.contrato === 0 && 'Vencido'
    const [data, setData] = useState([])
    fetchEquiposSet(setData);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', fontSize: mobile ? '12px' : '20px' }}>
                    <img src={jugador.logo} alt='.' style={{ height: '35px' }} />
                    {jugador.name}
                    <Grid item sx={{ color: light ? 'var(--dark3)' : 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{`(${jugador.equipo})`}</Grid>
                    {jugador.status === 'Prestamo' &&
                        <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Trasnfer size={18} />
                            <img src={filterJugadoresEquipoAnterior(data, jugador?.id_equipo_anterior)?.logo} alt="logo" style={{ height: '18px' }} />
                        </Grid>}
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Grid container alignItems={'center'} gap={2}>
                    {jugador.foto ? <Avatar alt="Jugador" src={jugador.foto} sx={{ height: '150px', width: '150px' }} /> :
                        <Avatar {...stringAvatar(jugador.name)} sx={{ height: '150px', width: '150px', fontSize: '55px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white', fontWeight: '700', letterSpacing: '2px' }} />}
                    <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                        {jugador.lesion === 'Si' &&
                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <img src="/images/lesion.png" alt="lesion" style={{ height: '16px' }} />
                                <Grid sx={{ color: 'var(--neutral)' }}>{'(Lesionado)'}</Grid>
                            </Grid>}
                    </Grid>
                    <Grid container alignItems={'center'} gap={2}>
                        <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600, color: light ? 'var(--dark2)' : 'var(--cero)' }}>#{!jugador.dorsal ? ' - ' : jugador.dorsal}</Grid>
                        <Grid item>
                            {(jugador.posicion == 'Portero') &&
                                <Grid sx={{ color: 'var(--warnning)', fontWeight: 700, fontSize: '17px' }}>PORTERO</Grid>}
                            {(jugador.posicion == 'Defensa') &&
                                <Grid sx={{ color: 'var(--gris)', fontWeight: 700, fontSize: '17px' }}>DEFENSOR</Grid>}
                            {(jugador.posicion == 'Medio') &&
                                <Grid sx={{ color: 'var(--check)', fontWeight: 700, fontSize: '17px' }}>MEDIO CENTRO</Grid>}
                            {(jugador.posicion == 'Delantero') &&
                                <Grid sx={{ color: 'var(--primario)', fontWeight: 700, fontSize: '17px' }}>DELANTERO</Grid>}
                        </Grid>
                        {jugador.capitan === 'Si' &&
                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', height: '25px', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px' }}>
                                    <img src="/images/capitan.png" alt="capitan" style={{ height: '16px' }} />
                                </Grid>
                            </Grid>}
                        <Grid container flexDirection={'column'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                {'Valor mercado: '} <strong style={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>{formatoPesosArgentinos(jugador.valor_mercado)}</strong>
                            </Grid>
                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                {'Clausula: '} <strong style={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>{formatoPesosArgentinos(jugador.clausula)}</strong>
                            </Grid>
                        </Grid>
                        <Grid container alignItems={'center'} gap={2} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            {jugador.partidos >= 2 && jugador.status === 'Nuevo' && (
                                <span style={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                                    {`Nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    ha jugado ${jugador.partidos} partidos con ${jugador.equipo} y está en el equipo 
                                    desde ${moment(jugador.fecha_inicio).format('DD/MM/YYYY')}, 
                                    tiene un contrato `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{constratos}</strong>
                                    {`, con un sueldo de `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{formatoPesosArgentinos(jugador.sueldo)}</strong>
                                </span>
                            )}

                            {jugador.partidos === 1 && jugador.status === 'Nuevo' && (
                                <span style={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                                    {`Nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    ha jugado ${jugador.partidos} partido con ${jugador.equipo} y está en el 
                                    equipo desde ${formatoFechaCreate}, 
                                    tiene un contrato `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{constratos}</strong>
                                    {`, con un sueldo de `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{formatoPesosArgentinos(jugador.sueldo)}</strong>
                                </span>
                            )}

                            {jugador.partidos === 0 && jugador.status === 'Nuevo' && (
                                <span style={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                                    {`Nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    no ha jugado ningún partido con ${jugador.equipo} y está en el equipo 
                                    desde ${moment(jugador.fecha_inicio).format('DD/MM/YYYY')}, 
                                    tiene un contrato `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{constratos}</strong>
                                    {`, con un sueldo de `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{formatoPesosArgentinos(jugador.sueldo)}</strong>
                                </span>
                            )}

                            {jugador.status === 'Prestamo' && (
                                <span style={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                                    {`Nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    llega en condicion de PRESTAMO desde el ${jugador.equipo} estara hasta 
                                    el final de temporara, teniendo en cuenta que con 
                                    su equipo de origen le queda un contrato `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{constratos}</strong>
                                    {`, con un sueldo de `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{formatoPesosArgentinos(jugador.sueldo)}</strong>
                                </span>
                            )}

                            {jugador.partidos === 0 && jugador.status === 'Fichado' && (
                                <span style={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                                    {`Nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    no ha jugado ningún partido con ${jugador.equipo} y está en el equipo 
                                    desde ${moment(jugador.fecha_fichaje).format('DD/MM/YYYY')}, 
                                    tiene un contrato `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{constratos}</strong>
                                    {`, con un sueldo de `}
                                    <strong style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>{formatoPesosArgentinos(jugador.sueldo)}</strong>
                                </span>
                            )}
                        </Grid>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: `1px ${light ? 'var(--dark2)' : 'var(--neutral)'} solid` } }}>
                                        <TableCell align="inherit" style={{ color: light ? "var(--dark2)" : "var(--cero)", fontSize: mobile ? '12px' : '14px', fontWeight: '800' }}>Estadística</TableCell>
                                        <TableCell align="center" style={{ color: light ? "var(--dark2)" : "var(--cero)", fontSize: mobile ? '12px' : '14px', fontWeight: '800' }}>Valor</TableCell>
                                        <TableCell align="center" style={{ color: light ? "var(--dark2)" : "var(--cero)", fontSize: mobile ? '12px' : '14px', fontWeight: '800' }}>Promedio</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: `1px ${light ? 'var(--dark2)' : 'var(--neutral)'} solid` } }}>
                                        <TableCell align="inherit">
                                            <Grid item sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '6px', color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400', width: mobile ? '90px' : '110px' }}>
                                                <Gol size={20} /> {'Goles'}
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.goles}</TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.goles, jugador.partidos)}</TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: `1px ${light ? 'var(--dark2)' : 'var(--neutral)'} solid` } }}>
                                        <TableCell align="inherit">
                                            <Grid item sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '6px', color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400', width: mobile ? '90px' : '110px' }}>
                                                <Tarjeta size={20} color={'var(--warnning)'} /> {'Amarillas'}
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.tarjetas_amarillas}</TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.tarjetas_amarillas, jugador.partidos)}</TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: `1px ${light ? 'var(--dark2)' : 'var(--neutral)'} solid` } }}>
                                        <TableCell align="inherit">
                                            <Grid item sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '6px', color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400', width: mobile ? '90px' : '110px' }}>
                                                <Tarjeta size={20} color={'var(--danger)'} /> {'Rojas'}
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.tarjetas_roja}</TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.tarjetas_roja, jugador.partidos)}</TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: `1px ${light ? 'var(--dark2)' : 'var(--neutral)'} solid` } }}>
                                        <TableCell align="inherit">
                                            <Grid item sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '6px', color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400', width: mobile ? '90px' : '110px' }}>
                                                <Tarjeta size={20} color={'var(--primario)'} /> {'Azules'}
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.tarjetas_azul}</TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.tarjetas_azul, jugador.partidos)}</TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: `1px ${light ? 'var(--dark2)' : 'var(--neutral)'} solid` } }}>
                                        <TableCell align="inherit">
                                            <Grid item sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '6px', color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400', width: mobile ? '90px' : '110px' }}>
                                                <Asistir size={20} /> {'Asistencias'}
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.asistencias}</TableCell>
                                        <TableCell align="center" style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.asistencias, jugador.partidos)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container alignItems={'center'} gap={2}>
                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                <a style={{ fontSize: mobile ? '12px' : '', display: 'flex', alignItems: 'center', gap: '6px' }} href={`https://www.instagram.com/${jugador?.instagram}`} target="_blank">
                                    <Insta size={mobile ? 16 : 25} />
                                    @{jugador.instagram}
                                </a>
                            </Grid>
                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                <a style={{ fontSize: mobile ? '12px' : '', display: 'flex', alignItems: 'center', gap: '6px' }} href={`https://www.twitter.com/${jugador?.twitter}`} target="_blank">
                                    <Twitter size={mobile ? 16 : 25} />
                                    @{jugador.twitter}
                                </a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container>
                    <Grid item container sx={{ padding: '14px' }}>
                        <ButtomSend
                            type="Secundario"
                            title="Cancelar"
                            icon={IoExit}
                            handleclick={handleClose}
                        />
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}