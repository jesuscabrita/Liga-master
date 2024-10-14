import { Avatar, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { ordenarJugadores, seleccionarData, stringAvatar } from "@/utils";
import { useContext, useState } from "react";
import { FlagIcon } from "./FlagIcon";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { MenuJugador } from "./MenuJugador";
import { posicionesOrdenadas } from "@/utils/arrays";
import { TablaPlantillaProps } from "@/interfaces";
import { BiTransfer as Trasnfer } from 'react-icons/bi';
import { fetchEquiposSet } from "@/lib";
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import Context from "@/context/contextPrincipal";
import StyledTableCell from "../Shared/StyledTableCell";
import StyledTableRow from "../Shared/StyledTableRow";

export const TablaPlantilla: React.FC<TablaPlantillaProps> = ({
    jugadores,
    equipo,
    queryClient,
    eliminarJugador,
    lesion_jugador,
    inscribir,
    listaTransferibleJugador,
    isSameEmail,
    isUserAdmin,
    setJugadorSeleccionado,
    setModalEditarJugador,
    setModalRecindir,
    setModalRenovar,
    setModalDorsal,
    setModalJugadorCapitan,
    setModalEditarJornada,
    setModalJugadorInfo,
    setIsLoadinng,
}) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});
    const [data, setData] = useState([])
    fetchEquiposSet (setData);

    const filterJugadores =(data: any[], id_equipo_anterior:string)=>{
        const equipoId = data?.find((equipo: any) => equipo._id == id_equipo_anterior); 
        return equipoId
    }

    return (
        <Grid item container sx={{ flex: 1, height: '100%' }}>
            {ordenarJugadores(jugadores, posicionesOrdenadas)?.length === 0 ?
                <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                    <Vacio size={140} />
                    No hay jugadores en este equipo
                </Grid>
                :
                <TableContainer component={Paper} sx={{ background: light ? 'var(--light)' : 'var(--dar3)', }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell light={light}>
                                    <Grid item sx={{ whiteSpace: 'nowrap' }}>
                                        Plantilla del equipo
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell light={light} />
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                            {ordenarJugadores(jugadores, posicionesOrdenadas) && ordenarJugadores(jugadores, posicionesOrdenadas)?.map((jugador, index) => {
                                const isOpen = openRows[index] || false;
                                return (
                                    <StyledTableRow light={light} key={jugador.id} style={{ background: jugador.suspendido === 'Si' ? 'var(--danger2)' : '' }}>
                                        <StyledTableCell light={light} component="th" scope="row">
                                            <Grid container flexDirection={'row'} alignItems={'center'} sx={{ minWidth: jugador.lesion === 'Si' ? '600px' : jugador.capitan === 'Si' ? '580px' : '550px', }}>
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
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px', cursor: 'pointer', width: '350px' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile ? '30px' : '', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500' }}>
                                                        {jugador.name}
                                                        {jugador.status === 'Fichado' && jugador.partidos < 2 &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <img src="/images/nuevo.png" alt="nuevo" style={{ height: '18px' }} />
                                                            </Grid>}
                                                        {jugador.status === 'Prestamo' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <Trasnfer size={20} />
                                                                <img src={filterJugadores(data, jugador?.id_equipo_anterior)?.logo} alt="logo" style={{ height: '18px' }} />
                                                            </Grid>}
                                                        {jugador.capitan === 'Si' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', height: '20px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px' }}>
                                                                    <img src="/images/capitan.png" alt="capitan" style={{ height: '16px' }} />
                                                                </Grid>
                                                            </Grid>}
                                                        {jugador.lesion === 'Si' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <img src="/images/lesion.png" alt="lesion" style={{ height: '16px' }} />
                                                            </Grid>}
                                                        {jugador.tarjetas_acumuladas > 0 && (<Grid item sx={{ display: 'flex', alignItems: 'center' }}>{jugador.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} size={20} /></Grid>)}
                                                        {jugador.suspendido === 'Si' && (
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', }}>
                                                                <img src="/images/suspendido.png" alt="suspendido" style={{ height: '18px', width: '22px' }} />
                                                                <Grid item ml={-1} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', fontSize: mobile ? '10px' : '11px' }}>{`(${jugador.jornadas_suspendido})`}</Grid>
                                                            </Grid>)}
                                                    </Grid>
                                                </Grid>
                                                <Grid item ml={2} sx={{ letterSpacing: '2px', fontSize: mobile ? '10px' : '14px', fontWeight: '500', width: '60px', }}>
                                                    <Grid item sx={{ fontSize: '16px', fontWeight: '800' }}>{`# ${!jugador.dorsal ? ' - ' : jugador.dorsal}`}</Grid>
                                                </Grid>
                                                <Grid item container ml={2} sx={{ width: '30px', }}>
                                                    <FlagIcon nacionalidad={jugador.nacionalidad} />
                                                </Grid>
                                            </Grid>
                                        </StyledTableCell>
                                        <StyledTableCell light={light} component="th" scope="row">
                                            {(isUserAdmin || isSameEmail) &&
                                                <MenuJugador
                                                    index={index}
                                                    isOpen={isOpen}
                                                    jugador={jugador}
                                                    equipo={equipo}
                                                    queryClient={queryClient}
                                                    setOpenRows={setOpenRows}
                                                    isSameEmail={isSameEmail}
                                                    isUserAdmin={isUserAdmin}
                                                    inscribir={inscribir}
                                                    setIsLoadinng={setIsLoadinng}
                                                    eliminarJugador={eliminarJugador}
                                                    lesion_jugador={lesion_jugador}
                                                    setModalDorsal={setModalDorsal}
                                                    setModalRenovar={setModalRenovar}
                                                    setModalRecindir={setModalRecindir}
                                                    setJugadorSeleccionado={setJugadorSeleccionado}
                                                    setModalJugadorCapitan={setModalJugadorCapitan}
                                                    setModalEditarJugador={setModalEditarJugador}
                                                    setModalEditarJornada={setModalEditarJornada}
                                                    listaTransferibleJugador={listaTransferibleJugador}
                                                />}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>}
        </Grid>
    )
}