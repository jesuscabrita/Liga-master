import ContextRefac from "@/context/contextLogin";
import Context from "@/context/contextPrincipal";
import { equiposGet } from "@/services/equipos";
import { ficharJugador, ofertaDelete, prestamoJugador } from "@/services/ofertas";
import { formatoPesosArgentinos } from "@/utils";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { BsCashCoin as Cash } from 'react-icons/bs';
import { AiOutlineComment as Coment } from 'react-icons/ai';
import { GiSoccerKick as Fut } from 'react-icons/gi';
import { IoExit } from "react-icons/io5";
import { BsFillCheckCircleFill as Acept } from "react-icons/bs";
import { TiDelete as Rechazar } from "react-icons/ti";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { alertaSubmit } from "@/utils/altert";
import { ContextType } from "@/interfaces";

interface ModalAceptarOfertaProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
    equipoId: string;
    jugadorId: string;
    data: any
}

interface Equipo {
    correo: string;
    banco_fondo: any;
    _id: string;
}

export const ModalAceptarOferta:React.FC<ModalAceptarOfertaProps> = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: fichar } = useMutation(ficharJugador);
    const { mutate: prestar } = useMutation(prestamoJugador);
    const { mutate: eliminarOfert } = useMutation(ofertaDelete);
    const { state: { user } } = useContext(ContextRefac) as ContextType;
    const [equipo, setEquipo] = useState<Equipo[]>([]);

    const { isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setEquipo(data);
        },
    })

    const filterEstado = () => {
        const newFilter = equipo?.filter(data => data.correo == user?.email);
        return newFilter;
    }

    const filterEmail = (array: any[]) => {
        const newFilter = array?.filter(data => data.email == user?.email);
        return newFilter;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const fichaDeJugador = (
        equipoOrigenId: string,
        equipoDestinoId: string,
        jugadorId: string,
        ficha: any,
        queryClient: QueryClient,
        setIsLoading: React.Dispatch<React.SetStateAction<any>>,
        handleClose: () => void,
        precioOferta: number,
        banco_fondo: number,
        sueldo: number,
        contrato: number
    ) => {
        setIsLoading(true);
        if (precioOferta > banco_fondo) {
            alertaSubmit(false, 'No cuentas con dinero suficiente, debes ingresar mas dinero a tu banco del equipo');
        }

        const form = {
            precio: precioOferta,
            contrato: contrato,
            sueldo: sueldo,
        };
        ficha({ form, equipoOrigenId, equipoDestinoId, jugadorId }, {
            onSuccess: (success: { message: string; }) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
                setIsLoading(false);
                handleClose()
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoading(false);
            },
        });
    }

    const prestamoDeJugador = (
        equipoOrigenId: string,
        equipoDestinoId: string,
        jugadorId: string,
        prestamo: any,
        queryClient: QueryClient,
        setIsLoading: React.Dispatch<React.SetStateAction<any>>,
        handleClose: () => void
    ) => {
        setIsLoading(true);
        const form = {};
        prestamo({ form, equipoOrigenId, equipoDestinoId, jugadorId }, {
            onSuccess: (success: { message: string; }) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
                setIsLoading(false);
                handleClose()
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoading(false);
            },
        });
    }

    const eliminarOfertas = (
        equipoId: string,
        jugadorId: string,
        ofertaId: string,
        deleteOfertas: any,
        queryClient: QueryClient,
        setIsLoading: React.Dispatch<React.SetStateAction<any>>,
        handleClose: () => void
    ) => {
        setIsLoading(true);
        deleteOfertas({ equipoId, jugadorId, ofertaId }, {
            onSuccess: (success: { message: string; }) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
                setIsLoading(false);
                handleClose()
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoading(false);
            },
        });
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {'Procesar oferta'}
                    <Cash size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                    {`En esta instancia ya solo falta procesar y verificar si cumples con los requisitos de la oferta y asi procesar los terminos del contrato.`}
                </Grid>
                {filterEmail(data.oferta).map((ofert, index) => {
                    return (
                        <>
                            <Grid key={index} container sx={{ alignItems: 'center', gap: '14px', background: light ? 'var(--gris)' : 'var(--dark2)', padding: '10px', borderRadius: '8px' }}>
                                <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={ofert.logo} alt={ofert.equipo} style={{ width: mobile ? '25px' : '45px', height: mobile ? '22px' : '42px' }} />
                                    <Grid item sx={{ fontSize: mobile ? '8px' : '11px', whiteSpace: 'nowrap', color: light ? 'var(--dark)' : 'var(--gris)' }}>{ofert.equipo}</Grid>
                                </Grid>
                                <Grid item sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                                        <Grid item sx={{ fontWeight: '700', color: light ? 'var(--dark)' : 'var(--cero)', fontSize: mobile ? '10px' : '14px' }}>Monto:</Grid>
                                        <Grid item sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)', fontSize: mobile ? '10px' : '14px' }}>{ofert.tipo === 'prestamo' ? '-' : formatoPesosArgentinos(ofert.precio)}</Grid>
                                    </Grid>
                                    <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                                        <Grid item sx={{ fontWeight: '700', color: light ? 'var(--dark)' : 'var(--cero)', fontSize: mobile ? '10px' : '14px' }}>Sueldo:</Grid>
                                        <Grid item sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)', fontSize: mobile ? '10px' : '14px' }}>{formatoPesosArgentinos(ofert.sueldo)}</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid item sx={{ fontWeight: '700', color: light ? 'var(--dark)' : 'var(--cero)', fontSize: mobile ? '10px' : '14px' }}>Contrato</Grid>
                                    <Grid item>
                                        {ofert.contrato === 0.5 &&
                                            <Grid item sx={{ whiteSpace: 'nowrap', fontSize: mobile ? '10px' : '14px', color: 'var(--danger)' }}>
                                                Media Temporada
                                            </Grid>}
                                        {ofert.contrato === 1 &&
                                            <Grid item sx={{ whiteSpace: 'nowrap', fontSize: mobile ? '10px' : '14px', color: 'var(--warnning)' }}>
                                                1 Temporada
                                            </Grid>}
                                        {ofert.contrato >= 2 &&
                                            <Grid item sx={{ whiteSpace: 'nowrap', fontSize: mobile ? '10px' : '14px', color: 'var(--check)' }}>
                                                {`${ofert.contrato} Temporadas`}
                                            </Grid>}
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid item sx={{ fontWeight: '700', color: light ? 'var(--dark)' : 'var(--cero)', fontSize: mobile ? '10px' : '14px' }}>Tipo</Grid>
                                    {ofert.tipo === 'compra' && <Grid item sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)', fontSize: mobile ? '10px' : '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>{ofert.tipo} <Cash color={'var(--check)'} /></Grid>}
                                    {ofert.tipo === 'prestamo' && <Grid item sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)', fontSize: mobile ? '10px' : '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>{ofert.tipo} <Fut color={'var(--warnning)'} /></Grid>}
                                </Grid>
                                <Grid item>
                                    <Grid item sx={{ fontWeight: '700', color: light ? 'var(--dark)' : 'var(--cero)', fontSize: mobile ? '10px' : '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>Comentario <Coment /></Grid>
                                    <Grid item sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)', fontSize: mobile ? '10px' : '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>{!ofert.comentario ? 'Sin comentarios' : ofert.comentario}</Grid>
                                </Grid>
                                <Grid item container sx={{ gap: '8px' }}>
                                    {ofert.tipo === 'compra' &&
                                        <Grid item container lg={5} md={5} xs={12}>
                                            <ButtomSend
                                                title='Procesar.F'
                                                icon={Acept}
                                                handleclick={() => { fichaDeJugador(equipoId, filterEstado()[0]?._id, data._id, fichar, queryClient, setIsLoading, handleClose, filterEmail(data.oferta)[0]?.precio, filterEstado()[0]?.banco_fondo, filterEmail(data.oferta)[0]?.sueldo, filterEmail(data.oferta)[0]?.contrato) }}
                                            />
                                        </Grid>}
                                    {ofert.tipo === 'prestamo' &&
                                        <Grid item container lg={5} md={5} xs={12}>
                                            <ButtomSend
                                                title='Procesar.P'
                                                icon={Acept}
                                                handleclick={() => { prestamoDeJugador(equipoId, filterEstado()[0]?._id, data._id, prestar, queryClient, setIsLoading, handleClose) }}
                                            />
                                        </Grid>}
                                    {ofert.tipo === 'compra' &&
                                        <Grid item container lg={5} md={5} xs={12}>
                                            <ButtomSend
                                                title='Cancelar fichaje'
                                                type="danger"
                                                icon={Rechazar}
                                                handleclick={() => { eliminarOfertas(equipoId, data._id, filterEmail(data?.oferta)[0]?._id, eliminarOfert, queryClient, setIsLoading, handleClose) }}
                                            />
                                        </Grid>}
                                    {ofert.tipo === 'prestamo' &&
                                        <Grid item container lg={5} md={5} xs={12}>
                                            <ButtomSend
                                                title='Cancelar prestamo'
                                                type="danger"
                                                icon={Rechazar}
                                                handleclick={() => { eliminarOfertas(equipoId, data._id, filterEmail(data?.oferta)[0]?._id, eliminarOfert, queryClient, setIsLoading, handleClose) }}
                                            />
                                        </Grid>}
                                </Grid>
                            </Grid>
                        </>)
                })}
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
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