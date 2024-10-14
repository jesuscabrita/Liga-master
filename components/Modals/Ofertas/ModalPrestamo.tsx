import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { InputTexArea } from "@/components/Shared/InputTextArea";
import { ContextType, ModalPrestamoProps } from "@/interfaces";
import { InputFields } from "@/components/Shared/InputFields";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { useMutation, useQueryClient } from "react-query";
import { useContext, useEffect, useState } from "react";
import { crearOfertaPrestamo } from "@/lib/ofertas";
import { BsCashCoin as Cash } from 'react-icons/bs';
import { ofertaPost } from "@/services/ofertas";
import { IoExit } from "react-icons/io5";
import { fetchEquiposSet } from "@/lib";
import ContextRefac from "@/context/contextLogin";
import Context from "@/context/contextPrincipal";

export const ModalPrestamo: React.FC<ModalPrestamoProps> = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const [light] = useContext(Context);
    const [sueldo, setSueldo] = useState(data?.sueldo);
    const [contrato, setContrato] = useState(data?.contrato);
    const [precio, setPrecio] = useState(data?.valor_mercado);
    const [comentario, setComentario] = useState('');
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: oferta } = useMutation(ofertaPost);
    const { state: { user } } = useContext(ContextRefac) as ContextType;
    const [equipo, setEquipo] = useState<{ correo: string; logo: any; }[]>([]);
    fetchEquiposSet(setEquipo)

    const filterEstado = () => {
        const newFilter = equipo?.filter((data: { correo: any; }) => data.correo == user?.email);
        return newFilter;
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSueldo(data?.sueldo);
        setContrato(data?.contrato);
        setPrecio(data?.valor_mercado)
    }, [data]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {`Negociar prestamo por ${data.name}`}
                    <Cash size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.transferible === 'No' &&
                    <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                        {`El prestamo de ${data.name} es gratis solo pagas la mitad 
                        de su salario`}
                    </Grid>}
                {data.transferible === 'Si' &&
                    <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                        {`El prestamo de ${data.name} es gratis solo pagas 
                        la mitad de su salario`}
                    </Grid>}
                <Grid item container>
                    <InputFields
                        title="Sueldo"
                        descripcion="Escribir el Sueldo del jugador"
                        placeholder="Sueldo"
                        type="number"
                        value={sueldo}
                        setValue={setSueldo}
                        disabled
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
                                crearOfertaPrestamo(
                                    equipoId,
                                    jugadorId,
                                    user?.equipo,
                                    filterEstado()[0]?.logo,
                                    precio,
                                    contrato,
                                    'prestamo',
                                    sueldo,
                                    setIsLoading,
                                    oferta,
                                    queryClient,
                                    handleClose,
                                    comentario,
                                    'Prestamo_Enviada',
                                    user?.email,
                                    user?._id
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