import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent, useMediaQuery } from "@mui/material";
import { editOfertaJugador, editOfertaNegociacion } from "@/lib/ofertas";
import { ContextType, ModalOfertaRecibidaProps } from "@/interfaces";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { InputTexArea } from "@/components/Shared/InputTextArea";
import { BsFillCheckCircleFill as Acept } from "react-icons/bs";
import { filterOfertas, formatoPesosArgentinos } from "@/utils";
import { InputSelects } from "@/components/Shared/InputSelect";
import { InputFields } from "@/components/Shared/InputFields";
import { AiOutlineComment as Coment } from 'react-icons/ai';
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { useMutation, useQueryClient } from "react-query";
import { FaBusinessTime as Nego } from 'react-icons/fa';
import { TiDelete as Rechazar } from "react-icons/ti";
import { GiSoccerKick as Fut } from 'react-icons/gi';
import { BsCashCoin as Cash } from 'react-icons/bs';
import { ofertaPut } from "@/services/ofertas";
import { useContext, useState } from "react";
import { IoExit } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { contratos } from "@/utils/arrays";
import { fetchEquiposSet } from "@/lib";
import Context from "@/context/contextPrincipal";
import ContextRefac from "@/context/contextLogin";
import moment from "moment";

export const ModalOfertaRecibida: React.FC<ModalOfertaRecibidaProps> = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [contrato, setContrato] = useState('Elija una opción')
    const [precio, setPrecio] = useState(0);
    const [comentario, setComentario] = useState('');
    const [negociar, setNegociar] = useState<{ [key: number]: boolean }>({});
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editOferta } = useMutation(ofertaPut);
    const { state: { user } } = useContext(ContextRefac) as ContextType;
    const [equipo, setEquipo] = useState<{ correo: string; logo: any; }[]>([]);
    const [precioError, setPrecioError] = useState(false);
    const [precioErrorText, setPrecioErrorText] = useState('');
    const [contratoError, setContratoError] = useState(false);
    const [contratoErrorText, setContratoErrorText] = useState('');
    fetchEquiposSet(setEquipo)

    const handleToggleNegociar = (index: number) => {
        setNegociar((prevState) => {
            const isCurrentlyOpen = prevState[index];
            if (!isCurrentlyOpen) {
                const updatedState: { [key: number]: boolean } = {};
                Object.keys(prevState).forEach((key) => {
                    updatedState[Number(key)] = false;
                });
                updatedState[index] = true;
                return updatedState;
            } else {
                return {
                    ...prevState,
                    [index]: !prevState[index],
                };
            }
        });
    };

    const handleToggleCancel = (index: any) => {
        setPrecioError(false)
        setPrecioErrorText('')
        setContratoError(false)
        setContratoErrorText('')
        setNegociar((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }))
    }

    const filterEstado = () => {
        const newFilter = equipo?.filter(data => data.correo == user?.email);
        return newFilter;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectContrato = (event: SelectChangeEvent<string>) => {
        setContratoError(false)
        setContratoErrorText('')
        setContrato(event.target.value)
    }

    const handlePrecio = (event: any) => {
        setPrecioError(false)
        setPrecioErrorText('')
        setPrecio(event.target.value)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {data.oferta.length === 1 && `Oferta Recibida`}
                    {data.oferta.length > 1 && `Ofertas Recibidas`}
                    <Cash size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.transferible === 'No' &&
                    <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--gris)", }}>
                        {filterOfertas(data).length === 1 &&
                            `Recibiste una oferta para ${data.name}, el jugador 
                        no esta en venta pero puedes revisar por si ofrece 
                        el monto de la clausula o mas, quizas sea de tu interes o no`}
                        {filterOfertas(data).length > 1 &&
                            `Recibiste ${filterOfertas(data).length} ofertas, los jugadores no  estan 
                        en venta, puedes revisar por si ofrece 
                        el monto de la clausula o mas, quizas sea de tu interes o no`}
                    </Grid>}
                {data.transferible === 'Si' &&
                    <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--gris)", }}>
                        {filterOfertas(data).length === 1 &&
                            `Recibiste una oferta para  ${data.name}, el jugador esta 
                        en venta, podes tomar en cuenta la propuesta`}
                        {filterOfertas(data).length > 1 &&
                            `Recibiste ${filterOfertas(data).length} ofertas, los jugadores estan 
                        en venta, podes tomar en cuenta la propuesta`}
                    </Grid>}
                {data?.oferta.map((ofert, index) => {
                    const isOpen = negociar[index] || false;
                    return (
                        ofert.respuesta != "Rechazar_prestamo" && ofert.respuesta != 'Negociar_oferta' && ofert.respuesta != 'Aceptar_prestamo' && ofert.respuesta != 'Aceptar_oferta' &&
                        <>
                            <Grid item container sx={{ color: light ? 'var(--dark)' : 'var(--cero)', fontSize: mobile ? '10px' : '14px' }}>{`Oferta recibida el ${moment(ofert.fecha_oferta).format('DD-MM-YYYY')}, a las ${moment(ofert.fecha_oferta).format('HH:mm:ss')}`}</Grid>
                            <Grid item key={index} container sx={{ alignItems: 'center', gap: '14px', background: light ? 'var(--gris)' : 'var(--dark2)', padding: '10px', borderBottom: (light ? "1px solid var(--gris2) !important" : '1px solid var(--gris) !important') }}>
                                <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: mobile ? '26px' : '45px' }}>
                                        <img src={ofert.logo} alt={ofert.equipo} style={{ height: mobile ? '26px' : '45px' }} />
                                    </Grid>
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
                                {ofert.tipo === 'prestamo' && <Grid item sx={{ color: light ? 'var(--dark)' : 'var(--neutral)', fontSize: mobile ? '8px' : '11px' }}>{'Informacion: debes saber que el prestamo dura lo que queda la temporada, luego vuelve a su equipo de origen dependiendo de su contrato'}</Grid>}
                                <Grid item>
                                    <Grid item sx={{ fontWeight: '700', color: light ? 'var(--dark)' : 'var(--cero)', fontSize: mobile ? '10px' : '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>Comentario <Coment /></Grid>
                                    <Grid item sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)', fontSize: mobile ? '10px' : '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>{!ofert.comentario ? 'Sin comentarios' : ofert.comentario}</Grid>
                                </Grid>
                                <Grid item container mt={2} sx={{ gap: '8px' }}>
                                    {ofert.tipo === 'compra' &&
                                        <Grid item container lg={3} md={3} xs={3.5}>
                                            <ButtomSend
                                                title='Aceptar'
                                                icon={Acept}
                                                disabled={isOpen || (Object.values(negociar).some((isOpen, i) => isOpen && i !== index))}
                                                iconSize={mobile ? 14 : 24}
                                                handleclick={() => {
                                                    editOfertaJugador(
                                                        equipoId,
                                                        data._id,
                                                        ofert._id,
                                                        editOferta,
                                                        queryClient,
                                                        'Aceptar_oferta',
                                                        setIsLoading,
                                                        handleClose,
                                                        'Se acepto la oferta'
                                                    )
                                                }}
                                            />
                                        </Grid>}
                                    {ofert.tipo === 'compra' &&
                                        <Grid item container lg={3} md={3} xs={3.5}>
                                            <ButtomSend
                                                type="Secundario"
                                                title='Negociar'
                                                icon={Nego}
                                                disabled={isOpen || (Object.values(negociar).some((isOpen, i) => isOpen && i !== index))}
                                                iconSize={mobile ? 14 : 24}
                                                handleclick={() => {
                                                    handleToggleNegociar(index)
                                                }}
                                            />
                                        </Grid>}
                                    {ofert.tipo === 'compra' &&
                                        <Grid item container lg={3} md={3} xs={3.5}>
                                            <ButtomSend
                                                title='Rechazar'
                                                type="danger"
                                                icon={Rechazar}
                                                disabled={isOpen || (Object.values(negociar).some((isOpen, i) => isOpen && i !== index))}
                                                iconSize={mobile ? 14 : 24}
                                                handleclick={() => {
                                                    editOfertaJugador(
                                                        equipoId,
                                                        data._id,
                                                        ofert._id,
                                                        editOferta,
                                                        queryClient,
                                                        'Rechazar_oferta',
                                                        setIsLoading,
                                                        handleClose,
                                                        'Se rechazo  la oferta'
                                                    )
                                                }}
                                            />
                                        </Grid>}
                                    {ofert.tipo === 'prestamo' &&
                                        <Grid item container lg={4} md={4} xs={3.5}>
                                            <ButtomSend
                                                title='Aceptar'
                                                icon={Acept}
                                                disabled={isOpen || (Object.values(negociar).some((isOpen, i) => isOpen && i !== index))}
                                                iconSize={mobile ? 14 : 24}
                                                handleclick={() => {
                                                    editOfertaJugador(
                                                        equipoId,
                                                        data._id,
                                                        ofert._id,
                                                        editOferta,
                                                        queryClient,
                                                        'Aceptar_prestamo',
                                                        setIsLoading,
                                                        handleClose,
                                                        'Se acepto el prestamo'
                                                    )
                                                }}
                                            />
                                        </Grid>}
                                    {ofert.tipo === 'prestamo' &&
                                        <Grid item container lg={4} md={4} xs={3.5}>
                                            <ButtomSend
                                                title='Rechazar'
                                                type="danger"
                                                icon={Rechazar}
                                                disabled={isOpen || (Object.values(negociar).some((isOpen, i) => isOpen && i !== index))}
                                                iconSize={mobile ? 14 : 24}
                                                handleclick={() => {
                                                    editOfertaJugador(
                                                        equipoId,
                                                        data._id,
                                                        ofert._id,
                                                        editOferta,
                                                        queryClient,
                                                        'Rechazar_prestamo',
                                                        setIsLoading,
                                                        handleClose,
                                                        'Se rechazo  la oferta'
                                                    )
                                                }}
                                            />
                                        </Grid>}
                                </Grid>
                                {isOpen &&
                                    <Grid item container alignItems={'center'} justifyContent={'end'}>
                                        <Grid item sx={{ color: light ? 'var(--dark)' : 'var(--cero)', fontSize: '10px', cursor: 'pointer', }} onClick={() => { handleToggleCancel(index) }}>
                                            Cancelar negociacion
                                        </Grid>
                                        <TiDelete
                                            size={30}
                                            style={{ cursor: 'pointer' }}
                                            color="var(--danger)"
                                            onClick={() => {
                                                handleToggleCancel(index)
                                            }}
                                        />
                                    </Grid>}
                                {isOpen &&
                                    <Grid item container>
                                        <Grid item container>
                                            <InputFields
                                                title="Oferta"
                                                descripcion="Escribir el monto de la oferta"
                                                placeholder="Oferta"
                                                type="number"
                                                value={precio}
                                                setValue={setPrecio}
                                                error={precioError}
                                                textError={precioErrorText}
                                                handleActive
                                                handleChange={handlePrecio}
                                                requerido
                                            />
                                        </Grid>
                                        <Grid item container>
                                            <InputSelects
                                                title="Contrato"
                                                value={contrato}
                                                descripcion="Seleccionar Contrato"
                                                handleSelect={handleSelectContrato}
                                                data={contratos}
                                                error={contratoError}
                                                textError={contratoErrorText}
                                                requerido
                                            />
                                        </Grid>
                                        <Grid item container>
                                            <InputTexArea
                                                rows={4}
                                                title="Comentario"
                                                descripcion="Escriba aca su comentario de la oferta"
                                                value={comentario}
                                                setValue={setComentario}
                                            />
                                        </Grid>
                                        <Grid item container>
                                            <ButtomSend
                                                title='Negociar'
                                                icon={Nego}
                                                handleclick={() => {
                                                    editOfertaNegociacion(
                                                        equipoId,
                                                        data._id,
                                                        ofert._id,
                                                        editOferta,
                                                        queryClient,
                                                        'Negociar_oferta',
                                                        setIsLoading,
                                                        handleClose,
                                                        'Se mando la negociacion de manera correcta',
                                                        precio,
                                                        contrato,
                                                        comentario,
                                                        user?.equipo,
                                                        filterEstado()[0]?.logo,
                                                        setPrecioError,
                                                        setPrecioErrorText,
                                                        setContratoError,
                                                        setContratoErrorText,
                                                    )
                                                }}
                                            />
                                        </Grid>
                                    </Grid>}
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