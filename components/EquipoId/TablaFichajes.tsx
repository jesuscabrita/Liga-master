import { Avatar, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { formatoPesosArgentinos, seleccionarData, stringAvatar } from "@/utils";
import { MdQuestionAnswer as Resp } from 'react-icons/md';
import { ImUserCheck as Acept } from 'react-icons/im';
import { MdAdminPanelSettings } from "react-icons/md";
import { MdNotificationsActive as Noti } from 'react-icons/md';
import { BiTransfer as Trasnfer } from 'react-icons/bi';
import { FaBusinessTime as Nego } from 'react-icons/fa';
import { TiDelete as Dele } from 'react-icons/ti';
import { MdSell as ListaTransf } from 'react-icons/md';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { ContextType, TablaFichajesProps } from "@/interfaces";
import { MenuFichajes } from "./MenuFichajes";
import { useContext, useState } from "react";
import { eliminarOfertas } from "@/lib/ofertas";
import ContextRefac from "@/context/contextLogin";
import StyledTableCell from "../Shared/StyledTableCell";
import StyledTableRow from "../Shared/StyledTableRow";
import Context from "@/context/contextPrincipal";

export const TablaFichajes: React.FC<TablaFichajesProps> = ({
    jugadores,
    equipoId,
    data,
    eliminarOfert,
    queryClient,
    setIsLoadinng,
    setModalJugadorInfo,
    setJugadorSeleccionado,
    setModalOferta,
    setModalOfertaRecibida,
    setModalAceptarOferta,
    setModalPrestamo,
    setModalNegociar,
}) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { state: { user } } = useContext(ContextRefac) as ContextType;
    const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

    const filterEmail = (array: any[]) => {
        const newFilter = array?.filter(data => data.email == user?.email);
        return newFilter;
    }

    const filterLibreJugadorData = (array: any[], estado: string) => {
        const newFilter = array?.filter(data => data.libre == estado && data.inscrito === 'Si' && data.status !== 'Prestamo');
        return newFilter;
    }

    const filterOferta = (array: any[]) => {
        const newFilter = array?.filter(data => data.respuesta !== 'Rechazar_prestamo' && data.respuesta !== 'Rechazar_oferta' && data.respuesta !== 'Negociar_oferta' && data.respuesta !== 'Aceptar_prestamo' && data.respuesta !== 'Aceptar_oferta');
        return newFilter;
    }

    return (
        <Grid item container>
            {filterLibreJugadorData(jugadores, 'No') && filterLibreJugadorData(jugadores, 'No')?.length === 0 ?
                <Grid item height={mobile ? "40vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                    <Vacio size={140} />
                    No hay jugadores en este equipo
                </Grid>
                :
                !user ?
                    <Grid item height={mobile ? "40vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px', textAlign: 'center' }}>
                        <MdAdminPanelSettings size={140} />
                        Solo los administradores de equipo pueden ver este panel
                    </Grid>
                    :
                    <TableContainer component={Paper} sx={{ background: light ? 'var(--light)' : 'var(--dar3)', }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell light={light} align="center"><Grid item sx={{ whiteSpace: 'nowrap' }}>Detalle</Grid></StyledTableCell>
                                    <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Jugador</Grid></StyledTableCell>
                                    <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Sueldo</Grid></StyledTableCell>
                                    <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Valor mercado</Grid></StyledTableCell>
                                    <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Clausula</Grid></StyledTableCell>
                                    <StyledTableCell light={light} />
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                {filterLibreJugadorData(jugadores, 'No') && filterLibreJugadorData(jugadores, 'No').map((jugador, index) => {
                                    const isOpen = openRows[index] || false;
                                    return (
                                        <StyledTableRow light={light} key={jugador.id} style={{ background: jugador.suspendido === 'Si' ? 'var(--danger2)' : '' }}>
                                            <StyledTableCell light={light} component="th" scope="row">
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
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px', cursor: 'pointer' }} >
                                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile ? '30px' : '', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                        {jugador.name}
                                                        {jugador.capitan === 'Si' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', height: '20px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px' }}>
                                                                    <img src="/images/capitan.png" alt="capitan" style={{ height: '16px' }} />
                                                                </Grid>
                                                            </Grid>}
                                                        {jugador.transferible === 'Si' && <ListaTransf size={16} color={'var(--warnning)'} />}
                                                    </Grid>
                                                    {filterOferta(jugador.oferta).length >= 1 && (user?.email === data?.correo) &&
                                                        <Grid item ml={2} mr={1} sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalOfertaRecibida) }}>
                                                            <Trasnfer size={18} /> <Noti size={20} color={'var(--danger)'} />
                                                            <Grid item sx={{ fontSize: '12px' }}>{filterOferta(jugador.oferta).length}</Grid>
                                                        </Grid>}
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="left">
                                                <Grid item sx={{ whiteSpace: 'nowrap', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', }}>{formatoPesosArgentinos(jugador.sueldo)}</Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="left">
                                                <Grid item sx={{ whiteSpace: 'nowrap', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', }}>{formatoPesosArgentinos(jugador.valor_mercado)}</Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="left">
                                                <Grid item sx={{ whiteSpace: 'nowrap', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', }}>{formatoPesosArgentinos(jugador.clausula)}</Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="left" >
                                                {(user?.email !== data?.correo && filterEmail(jugador?.oferta)[0]?.respuesta !== 'Oferta_Enviada' && filterEmail(jugador?.oferta)[0]?.respuesta !== 'Negociar_oferta' && filterEmail(jugador?.oferta)[0]?.respuesta !== 'Rechazar_oferta' && filterEmail(jugador?.oferta)[0]?.respuesta !== 'Prestamo_Enviada') &&
                                                    <MenuFichajes
                                                        index={index}
                                                        isOpen={isOpen}
                                                        jugador={jugador}
                                                        setJugadorSeleccionado={setJugadorSeleccionado}
                                                        setModalOferta={setModalOferta}
                                                        setModalPrestamo={setModalPrestamo}
                                                        setOpenRows={setOpenRows}
                                                    />}
                                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Oferta_Enviada' &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Nego size={25} color={''} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Esperano...'}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === data?.correo) && jugador?.oferta[0]?.respuesta === 'Negociar_oferta' &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Nego size={25} color={''} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'negociando...'}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Negociar_oferta' &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalNegociar) }}>
                                                        <Resp size={25} color={''} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Quieren Negociar'}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Rechazar_oferta' &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => { eliminarOfertas(equipoId, jugador?._id, filterEmail(jugador?.oferta)[0]?._id, eliminarOfert, queryClient, setIsLoadinng) }}>
                                                        <Dele size={30} color={'var(--danger)'} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Oferta Rechazada'}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === data?.correo) && jugador?.oferta[0]?.respuesta === 'Rechazar_oferta' &&
                                                    <Grid item sx={{ fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => { eliminarOfertas(equipoId, jugador?._id, filterEmail(jugador?.oferta)[0]?._id, eliminarOfert, queryClient, setIsLoadinng) }}>
                                                        <Dele size={30} color={'var(--danger)'} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {`Rechazaste la oferta del`}
                                                        </Grid>
                                                        <Grid item sx={{ fontSize: '10px' }}>
                                                            {jugador?.oferta[0]?.equipo}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Aceptar_oferta' &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalAceptarOferta) }}>
                                                        <Acept size={25} color={'var(--check)'} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Oferta aceptada'}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === data?.correo) && jugador?.oferta[0]?.respuesta === 'Aceptar_oferta' &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Acept size={25} color={'var(--check)'} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Oferta aceptada'}
                                                        </Grid>
                                                    </Grid>}

                                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && (filterEmail(jugador?.oferta)[0]?.respuesta === 'Prestamo_Enviada') &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Nego size={25} color={''} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Esperano...'}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Rechazar_prestamo' &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => { eliminarOfertas(equipoId, jugador?._id, filterEmail(jugador?.oferta)[0]?._id, eliminarOfert, queryClient, setIsLoadinng) }}>
                                                        <Dele size={30} color={'var(--danger)'} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Prestamo Rechazado'}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === data?.correo) && jugador?.oferta[0]?.respuesta === 'Rechazar_prestamo' &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => { eliminarOfertas(equipoId, jugador?._id, filterEmail(jugador?.oferta)[0]?._id, eliminarOfert, queryClient, setIsLoadinng) }}>
                                                        <Dele size={30} color={'var(--danger)'} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Prestamo Rechazado'}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && (filterEmail(jugador?.oferta)[0]?.respuesta === 'Aceptar_prestamo') &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalAceptarOferta) }}>
                                                        <Acept size={25} color={'var(--check)'} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Prestamo aceptado'}
                                                        </Grid>
                                                    </Grid>}
                                                {(jugador?.oferta?.length > 0 && user?.email === data?.correo) && jugador?.oferta[0]?.respuesta === 'Aceptar_prestamo' &&
                                                    <Grid item sx={{ whiteSpace: 'nowrap', fontSize: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Acept size={25} color={'var(--check)'} />
                                                        <Grid item sx={{ fontSize: '8px' }}>
                                                            {'Prestamo aceptado'}
                                                        </Grid>
                                                    </Grid>}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </Grid>
    )
}