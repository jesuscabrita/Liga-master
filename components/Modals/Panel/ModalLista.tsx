import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tooltip, useMediaQuery } from "@mui/material";
import { bajarPartido, editarPartido } from "@/lib/panelPartidos";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { BsFillPatchCheckFill as Check } from "react-icons/bs";
import { jugadoresPut_partidos } from "@/services/jugadores";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { MdOutlinePersonOff as Susp } from 'react-icons/md';
import { RiUserUnfollowFill as Baja } from 'react-icons/ri';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { useMutation, useQueryClient } from "react-query";
import { FaClipboardList as List } from 'react-icons/fa';
import { useContext, useEffect, useState } from "react";
import { ModalListaProps } from "@/interfaces";
import { IoExit } from "react-icons/io5";
import { stringAvatar } from "@/utils";
import Context from "@/context/contextPrincipal";

export const ModalLista: React.FC<ModalListaProps> = ({ open, setOpen, data, currentRound }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editarPartidos } = useMutation(jugadoresPut_partidos);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    const handleClose = () => {
        setOpen(false);
    };

    const filterInscrito = (array: any[]) => {
        const newFilter = array?.filter(data => data.inscrito === 'Si');
        return newFilter;
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Lista Convocados"}
                    <List size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filterInscrito(data?.jugadores).map((jugador, index) => {
                    return (
                        <Grid item gap={1} p={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: light ? 'var(--dark2)' : 'var(--cero)', background: jugador.suspendido === 'Si' ? 'var(--danger2)' : '', borderRadius: '8px' }}>
                            <Grid item sx={{ fontSize: mobile ? '15px' : '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: mobile ? '20px' : '40px', fontWeight: 600 }}>#{jugador.dorsal}</Grid>
                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: mobile ? '20px' : '35px', height: mobile ? '20px' : '35px' }}>
                                <Tooltip title={jugador.foto ? <img src={jugador.foto} alt="Imagen" style={{ width: '150px', height: '150px' }} /> : <Avatar {...stringAvatar(jugador.name)} sx={{ width: '150px', height: '150px' }} />} arrow placement="top">
                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: mobile ? '20px' : '35px', width: mobile ? '20px' : '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white', fontSize: mobile ? '10px' : '14px' }} />
                                </Tooltip>
                            </Grid>
                            <Grid item sx={{ display: 'flex' }}>
                                <Grid item gap={1} sx={{ width: mobile ? '100%' : '350px', cursor: jugador.suspendido === 'Si' ? 'default' : 'pointer', display: 'flex', alignItems: 'center', fontSize: mobile ? '10px' : '16px', whiteSpace: 'nowrap' }}>
                                    {jugador.name}
                                    {jugador.tarjetas_acumuladas > 0 && (<Grid item sx={{ display: 'flex', alignItems: 'center' }}>{jugador.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} /></Grid>)}
                                    {jugador.partidos_individual[currentRound] === 'Si' &&
                                        <Grid item sx={{ color: 'var(--check)' }}>{mobile ? '(Si)' : '(Convocado)'}</Grid>}
                                    {jugador.partidos_individual[currentRound] === 'No' &&
                                        <Grid item sx={{ color: 'var(--neutral)' }}>{mobile ? '(No)' : '(No convocado)'}</Grid>}
                                    {jugador.suspendido === 'Si' &&
                                        <Tooltip title={`${jugador.name} fue expulsado y esta suspendido por ${jugador.jornadas_suspendido} jornada`} placement="top">
                                            <Grid item sx={{ color: 'var(--neutral)' }}>{mobile ? <Susp /> : '(Expulsado)'}</Grid>
                                        </Tooltip>}
                                    {jugador.lesion === 'Si' &&
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Lesion size={mobile ? 15 : 20} />
                                            <Grid sx={{ color: 'var(--neutral)' }}>{mobile ? '(L)' : '(Lesion)'}</Grid>
                                        </Grid>}
                                </Grid>
                            </Grid>
                            <Grid item sx={{ cursor: jugador.suspendido === 'Si' ? 'default' : 'pointer', color: jugador.suspendido === 'Si' ? 'var(--neutral)' : jugador.partidos_individual[currentRound] === 'Si' ? 'var(--check)' : 'var(--primario)' }}
                                onClick={() => {
                                    jugador.suspendido === 'Si' ? null :
                                        editarPartido(
                                            data._id,
                                            jugador._id,
                                            currentRound,
                                            jugador.name,
                                            jugador.partidos,
                                            jugador.partidos_individual,
                                            setIsLoading,
                                            editarPartidos,
                                            queryClient
                                        )
                                }}>
                                <Check size={mobile ? 15 : 20} />
                            </Grid>
                            {jugador.partidos_individual[currentRound] === 'Si' &&
                                <Grid sx={{ cursor: jugador.suspendido === 'Si' ? 'default' : 'pointer', color: jugador.suspendido === 'Si' ? 'var(--neutral)' : 'var(--danger)' }}
                                    onClick={() => {
                                        jugador.suspendido === 'Si' ? null :
                                            bajarPartido(
                                                data._id,
                                                jugador._id,
                                                currentRound,
                                                jugador.name,
                                                jugador.partidos,
                                                jugador.partidos_individual,
                                                setIsLoading,
                                                editarPartidos,
                                                queryClient
                                            )
                                    }}>
                                    <Baja />
                                </Grid>
                            }
                        </Grid>
                    )
                })}
            </DialogContent>
            {isLoading && <LoadingScreen />}
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