import { useContext } from "react";
import { Badge, Grid, Tooltip, useMediaQuery } from "@mui/material"
import { BsFillChatLeftDotsFill as Chat } from "react-icons/bs";
import { AiOutlineEdit as Editar } from 'react-icons/ai';
import { MdDelete as Borrar } from 'react-icons/md';
import { GiLaurelsTrophy as Liga } from "react-icons/gi";
import { GiTrophyCup as CopaOro } from "react-icons/gi";
import { AiFillTrophy as CopaPlata } from "react-icons/ai";
import { GrInstagram as Instagram } from 'react-icons/gr';
import { formatoPesosArgentinos, seleccionarData } from "@/utils";
import { ArrowP } from "../Shared/ArrowP";
import { eliminarDelegados } from "@/lib/delegado";
import { DatosEquipoProps } from "@/interfaces";
import Context from "@/context/contextPrincipal";

export const DatosEquipo: React.FC<DatosEquipoProps> = ({
    data,
    isSameEmail,
    isUserAdmin,
    equipo_id,
    eliminarDelegado,
    equipoIndex,
    queryClient,
    setDelegadoSeleccionado,
    setModalDelegadoChat,
    setModalDelegadoEditar,
}) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
        <Grid item container>
            <Grid item container sx={{ color: light ? "var(--cero)" : "var(--dark2)", background: light ? 'var(--dark2)' : 'var(--gris4)', padding: '20px', letterSpacing: '2px', fontSize: mobile ? '18px' : '24px', fontWeight: '600' }}>
                {data.equipo.name}
            </Grid>
            <Grid item container flexDirection={'row'} alignItems={'center'}>
                <Grid item lg={2} md={2} xs={4.5} p={2}>
                    <img style={{ height: mobile ? '80px' : '120px' }} src={data.equipo.logo} alt="logo" />
                </Grid>
                <Grid item container lg={10} md={8} xs={7.5}>
                    <Grid item container lg={2} md={2} xs={6} mt={mobile ? 3 : 0} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '10px' : '13px', fontWeight: '800' }}>
                        <Grid item container alignItems={'center'}>
                            Posicion en liga
                        </Grid>
                        <Grid item container alignItems={'center'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '9px' : '12px', fontWeight: '400' }}>
                            # {equipoIndex + 1}
                            {data.equipo.partidosJugados >= 1 &&
                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ whiteSpace: 'nowrap', width: '30px' }}>
                                    <ArrowP currentPos={equipoIndex} prevPos={data.equipo.puntaje_anterior} light={light} />
                                </Grid>}
                        </Grid>
                    </Grid>
                    <Grid item container lg={2} md={2} xs={4} mt={mobile ? 3 : 0} ml={mobile ? 1 : 0} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '10px' : '13px', fontWeight: '800', }}>
                        <Grid item container alignItems={'center'}>
                            Plantilla
                        </Grid>
                        <Grid item container alignItems={'center'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '9px' : '12px', fontWeight: '400' }}>
                            {`${data?.equipo.jugadores.length} Judadores`}
                        </Grid>
                    </Grid>
                    <Grid item container lg={2} md={2} xs={6} mt={mobile ? 1 : 0} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '10px' : '13px', fontWeight: '800', }}>
                        <Grid item container alignItems={'center'} gap={1}>
                            Instagram
                            <Instagram size={mobile ? 10 : 15} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                        </Grid>
                        <Grid item container alignItems={'center'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '9px' : '12px', fontWeight: '400' }}>
                            <a href={`https://www.instagram.com/${data?.equipo.instagram}`} target="_blank">
                                <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                    @{!data?.equipo.instagram ? 'No definido' : data?.equipo.instagram}
                                </Grid>
                            </a>
                        </Grid>
                    </Grid>
                    <Grid item container lg={2} md={2} xs={6} mt={mobile ? 1 : 0} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '10px' : '13px', fontWeight: '800', }}>
                        <Grid item container alignItems={'center'} gap={1}>
                            Delegado
                        </Grid>
                        <Grid item container alignItems={'center'} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '9px' : '12px', fontWeight: '400' }}>
                            {(data?.equipo.delegado?.length === 0) ? ' No definido' : ' ' + data?.equipo.delegado?.[0]?.name}
                            {data?.equipo.delegado?.length > 0 &&
                                <Tooltip title="Contactar al delegado del equipo" placement="top">
                                    <Grid item ml={1} sx={{ cursor: 'pointer' }} onClick={() => { seleccionarData(data?.equipo.delegado, setDelegadoSeleccionado, setModalDelegadoChat) }}>
                                        <Chat size={mobile ? 10 : 15} />
                                    </Grid>
                                </Tooltip>
                            }
                            {isUserAdmin && (data?.equipo?.delegado?.length > 0) &&
                                <Tooltip title="Elimina el delegado" placement="top">
                                    <Grid item ml={1} sx={{ cursor: 'pointer' }} onClick={() => { eliminarDelegados(equipo_id, data?.equipo.delegado?.[0]?._id, eliminarDelegado, queryClient) }}>
                                        <Borrar size={mobile ? 10 : 15} color={'var(--danger)'} />
                                    </Grid>
                                </Tooltip>
                            }
                            {isUserAdmin && (data?.equipo?.delegado?.length > 0) &&
                                <Tooltip title="Editar el delegado" placement="top">
                                    <Grid item ml={1} sx={{ cursor: 'pointer' }} onClick={() => { seleccionarData(data?.equipo?.delegado, setDelegadoSeleccionado, setModalDelegadoEditar) }}>
                                        <Editar size={mobile ? 10 : 15} />
                                    </Grid>
                                </Tooltip>
                            }
                        </Grid>
                    </Grid>
                    {(isUserAdmin || isSameEmail) &&
                        <Grid item container flexDirection={'column'} lg={4} md={4} xs={11} mb={mobile ? 1 : 0} mt={mobile ? 2 : 0} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '10px' : '20px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: mobile ? '8px' : '18px', borderRadius: '3px' }}>
                            <Grid item sx={{ fontSize: mobile ? '8px' : '12px', fontWeight: '500', }}>Banco</Grid>
                            <Grid item>{formatoPesosArgentinos(data?.equipo.banco_fondo)}</Grid>
                        </Grid>}
                    {!isUserAdmin && !isSameEmail &&
                        <Grid item container flexDirection={'column'} lg={4} md={4} xs={11} mb={mobile ? 1 : 0} mt={mobile ? 2 : 0} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '10px' : '20px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: mobile ? '8px' : '18px', borderRadius: '3px' }}>
                            <Grid item sx={{ fontSize: mobile ? '8px' : '12px', fontWeight: '500', }}>Banco</Grid>
                            <Grid item sx={{ fontSize: mobile ? '8px' : '12px', fontWeight: '500', }}>{`-Solo el ${data?.equipo.name} puede ver esto.`}</Grid>
                        </Grid>}
                </Grid>
                <Grid item container flexDirection={'row'} alignItems={'center'}>
                    <Grid item p={2} lg={1} md={1} xs={3} container flexDirection={'column'} alignItems={'center'} sx={{ fontSize: mobile ? '8px' : '12px', color: light ? "var(--dark4)" : 'var(--gris4)' }}>
                        <Badge badgeContent={4} color="secondary">
                            <Liga size={mobile ? 40 : 80} color={light ? "var(--dark4)" : 'var(--gris4)'} />
                        </Badge>
                        Liga
                    </Grid>
                    <Grid item p={2} lg={1} md={1} xs={3} container flexDirection={'column'} alignItems={'center'} sx={{ fontSize: mobile ? '8px' : '12px', color: light ? "var(--dark4)" : 'var(--gris4)' }}>
                        <Badge badgeContent={4} color="secondary">
                            <CopaOro size={mobile ? 40 : 80} color={light ? "var(--dark4)" : 'var(--gris4)'} />
                        </Badge>
                        Copa oro
                    </Grid>
                    <Grid item p={2} lg={1} md={1} xs={3} container flexDirection={'column'} alignItems={'center'} sx={{ fontSize: mobile ? '8px' : '12px', color: light ? "var(--dark4)" : 'var(--gris4)' }}>
                        <Badge badgeContent={4} color="secondary">
                            <CopaPlata size={mobile ? 40 : 80} color={light ? "var(--dark4)" : 'var(--gris4)'} />
                        </Badge>
                        Copa plata
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}