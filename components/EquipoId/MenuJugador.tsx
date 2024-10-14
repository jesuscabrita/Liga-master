import { eliminarJugadores, InscribirJugador, lesionJugadores, listaDeTransferibles } from "@/lib/jugadores";
import { seleccionarData } from "@/utils";
import { Grid } from "@mui/material"
import { useContext } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { AiFillEdit as Edit } from 'react-icons/ai';
import { MdOutlinePersonOff as Suspender } from 'react-icons/md';
import { MdDelete as Eliminar } from 'react-icons/md';
import { MdSell as ListaTransf } from 'react-icons/md';
import { MdAutorenew as Renovar } from 'react-icons/md';
import { FaFilePrescription as Recindir } from 'react-icons/fa';
import { AiOutlineFieldNumber as Num } from 'react-icons/ai';
import { GiArchiveRegister as Regis } from 'react-icons/gi';
import { MenuJugadorProps } from "@/interfaces";
import Context from "@/context/contextPrincipal";

export const MenuJugador: React.FC<MenuJugadorProps> = ({
    isOpen,
    index,
    isSameEmail,
    isUserAdmin,
    jugador,
    equipo,
    lesion_jugador,
    queryClient,
    eliminarJugador,
    listaTransferibleJugador,
    inscribir,
    setJugadorSeleccionado,
    setModalJugadorCapitan,
    setModalEditarJugador,
    setModalEditarJornada,
    setModalRenovar,
    setModalRecindir,
    setModalDorsal,
    setOpenRows,
    setIsLoadinng
}) => {
    const [light] = useContext(Context);

    const handleRowClick = (index: number) => {
        setOpenRows((prev: any[]) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <Grid item className="relative ml-3">
            <Grid item>
                <button
                    type="button"
                    className={`flex rounded-full ${!light ? 'bg-gray-800' : 'bg-[transparent]'} text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                    id="user-menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => handleRowClick(index)}
                >
                    <HiMenuAlt1 size={30} style={{ cursor: 'pointer' }} onClick={() => { }} />
                </button>
            </Grid>
            {isOpen && (
                <Grid item sx={{ background: light ? "var(--gris)" : "var(--dark2)", border: light ? '1px solid var(--dark2)' : '1px solid #aab4be' }} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                    {(isUserAdmin || isSameEmail) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorCapitan); setOpenRows({}) }}>
                            Capitan
                            <img src="/images/capitan.png" alt="capitan" style={{ height: '16px' }} />
                        </Grid>}
                    {(isUserAdmin) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={() => {
                                (jugador.lesion === 'No' && isUserAdmin) ?
                                    lesionJugadores(
                                        equipo._id,
                                        jugador._id,
                                        lesion_jugador,
                                        queryClient,
                                        'Si',
                                        'Si, Lesionar!',
                                        'Jugador Lesionado!',
                                        'El jugador ha sido lesionado.',
                                        'El jugador no se lesiono :)'
                                    ) :
                                    lesionJugadores(
                                        equipo._id,
                                        jugador._id,
                                        lesion_jugador,
                                        queryClient,
                                        'No',
                                        'Si, Recuperar!',
                                        'Jugador Recuperado!',
                                        'El jugador ha sido recuperado.',
                                        'El jugador no se recupero :)'
                                    ); setOpenRows({})
                            }}>
                            {(jugador.lesion === 'No' && isUserAdmin) ? "Lesion" : 'Recuperar'}
                            <img src="/images/lesion.png" alt="lesion" style={{ height: '16px' }} />
                        </Grid>}
                    {(isUserAdmin) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalEditarJugador); setOpenRows({}) }}>
                            Editar
                            <Edit />
                        </Grid>}
                    {(isUserAdmin) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: jugador.jornadas_suspendido < 1 ? 'no-drop' : 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={jugador.jornadas_suspendido < 1 ? () => { } : () => { seleccionarData(jugador, setJugadorSeleccionado, setModalEditarJornada); setOpenRows({}) }}>
                            Suspender
                            <Suspender />
                        </Grid>}
                    {(isUserAdmin) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={() => { eliminarJugadores(equipo._id, jugador._id, eliminarJugador, queryClient); setOpenRows({}) }}>
                            Eliminar
                            <Eliminar />
                        </Grid>}
                    <Grid item mb={1} mt={1} container sx={{ borderBottom: light ? "1px solid var(--dark2)" : "1px solid var(--cero)" }} />
                    {(isSameEmail || isUserAdmin) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={jugador.transferible === 'No' ? () => {
                                listaDeTransferibles(
                                    equipo._id,
                                    jugador._id,
                                    listaTransferibleJugador,
                                    queryClient,
                                    'Si',
                                    'Si, Mover a lista de transferibles!',
                                    'Jugador en lista de transferibles!',
                                    'El jugador ha sido movido a la lista de transferibles',
                                    'El jugador no se movio a la lista de trnasferibles :)'
                                ); setOpenRows({})
                            } : () => {
                                listaDeTransferibles(
                                    equipo._id,
                                    jugador._id,
                                    listaTransferibleJugador,
                                    queryClient,
                                    'No',
                                    'Si, Mover de lista de transferibles!',
                                    'Jugador en lista de transferibles!',
                                    'El jugador ha sido movido a la lista de transferibles',
                                    'El jugador no se movio de la lista de transferibles :)'
                                ); setOpenRows({})
                            }}>
                            {jugador.transferible === 'No' ? 'Mover a transferible' : 'Quitar de transferifle'}
                            <ListaTransf />
                        </Grid>}
                    {(isSameEmail || isUserAdmin) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalRenovar); setOpenRows({}) }}>
                            Renovar contrato
                            <Renovar />
                        </Grid>}
                    {(isSameEmail || isUserAdmin) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: jugador.contrato === 0 ? 'no-drop' : 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={jugador.contrato === 0 ? () => { } : () => { seleccionarData(jugador, setJugadorSeleccionado, setModalRecindir); setOpenRows({}) }}>
                            Recindir contrato
                            <Recindir color="var(--marcaRed)" />
                        </Grid>}
                    {(isSameEmail || isUserAdmin) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalDorsal); setOpenRows({}) }}>
                            Dorsal
                            <Num />
                        </Grid>}
                    {(isSameEmail || isUserAdmin) &&
                        <Grid item container alignItems={'center'} gap={1} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)', '&:hover': { backgroundColor: light ? 'var(--dark2)' : '#aab4be', color: light ? 'var(--cero)' : 'var(--dark2)' } }} className="block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                            onClick={jugador.inscrito === 'No' ? () => { InscribirJugador(equipo._id, jugador._id, inscribir, queryClient, 'Si', setIsLoadinng); setOpenRows({}) } : () => { InscribirJugador(equipo._id, jugador._id, inscribir, queryClient, 'No', setIsLoadinng); setOpenRows({}) }}>
                            {jugador.inscrito === 'No' ? 'Inscribir' : 'No inscribir'}
                            <Regis />
                        </Grid>}
                </Grid>
            )}
        </Grid>
    )
}