import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent } from "@mui/material";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { InputTexArea } from "@/components/Shared/InputTextArea";
import { InputSelects } from "@/components/Shared/InputSelect";
import { InputFields } from "@/components/Shared/InputFields";
import { ContextType, ModalOfertaProps } from "@/interfaces";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { useMutation, useQueryClient } from "react-query";
import { BsCashCoin as Cash } from 'react-icons/bs';
import { formatoPesosArgentinos } from "@/utils";
import { ofertaPost } from "@/services/ofertas";
import { useContext, useState } from "react";
import { crearOferta } from "@/lib/ofertas";
import { contratos } from "@/utils/arrays";
import { fetchEquiposSet } from "@/lib";
import { IoExit } from "react-icons/io5";
import ContextRefac from "@/context/contextLogin";
import Context from "@/context/contextPrincipal";

export const ModalOferta: React.FC<ModalOfertaProps> = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const [light] = useContext(Context);
    const [sueldo, setSueldo] = useState(null);
    const [contrato, setContrato] = useState('Elija una opción')
    const [precio, setPrecio] = useState('');
    const [comentario, setComentario] = useState('');
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: oferta } = useMutation(ofertaPost);
    const { state: { user } } = useContext(ContextRefac) as ContextType;
    const [equipo, setEquipo] = useState<{ correo: string; logo: any }[]>([]);
    const [sueldoError, setSueldoError] = useState(false);
    const [sueldoErrorText, setSueldoErrorText] = useState('');
    const [contratoError, setContratoError] = useState(false);
    const [contratoErrorText, setContratoErrorText] = useState('');
    const [precioError, setPrecioError] = useState(false);
    const [precioErrorText, setPrecioErrorText] = useState('');
    fetchEquiposSet(setEquipo)

    const filterEstado = () => {
        const newFilter = equipo?.filter((data: { correo: any; }) => data.correo == user?.email);
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

    const handleSueldo = (event: any) => {
        setSueldoError(false)
        setSueldoErrorText('')
        setSueldo(event.target.value)
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
                    {"Fichar jugador"}
                    <Cash size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.transferible === 'No' &&
                    <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                        {`El monto minimo para negociar con ${data.name} es de 
                        ${formatoPesosArgentinos(data?.valor_mercado)}, el jugador 
                        no esta en venta pero puedes enviarte una oferta. 
                        (en este caso es recomendable pagar la clausula, quizas acepte)`}
                    </Grid>}
                {data.transferible === 'Si' &&
                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                        {`El monto minimo para negociar con ${data.name} es de 
                        ${formatoPesosArgentinos(data.valor_mercado)}, el jugador esta en 
                        venta, podes ofrecer un precio sin necesidad de pagar clausula`}
                    </Grid>}
                <Grid item container>
                    <InputFields
                        title="Sueldo"
                        descripcion="Escribir el Sueldo del jugador"
                        placeholder="Sueldo"
                        type="number"
                        value={sueldo}
                        setValue={setSueldo}
                        error={sueldoError}
                        textError={sueldoErrorText}
                        handleActive
                        handleChange={handleSueldo}
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
                    />
                </Grid>
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
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Negociar"
                            icon={Cash}
                            handleclick={() => {
                                crearOferta(
                                    equipoId,
                                    jugadorId,
                                    user?.equipo,
                                    filterEstado()[0]?.logo,
                                    precio,
                                    contrato,
                                    'compra',
                                    sueldo,
                                    setIsLoading,
                                    oferta,
                                    queryClient,
                                    handleClose,
                                    comentario,
                                    'Oferta_Enviada',
                                    user?.email,
                                    user?._id,
                                    setSueldoError,
                                    setSueldoErrorText,
                                    setContratoError,
                                    setContratoErrorText,
                                    setPrecioError,
                                    setPrecioErrorText,
                                )
                            }}
                        />
                    </Grid>
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