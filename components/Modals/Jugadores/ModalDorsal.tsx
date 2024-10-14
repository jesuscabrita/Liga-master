import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { jugadoresDorsal } from "@/services/jugadores";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AiOutlineFieldNumber as Num } from 'react-icons/ai';
import { InputFields } from "@/components/Shared/InputFields";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { IoExit } from "react-icons/io5";
import { ModalGlobalV2Props } from "@/interfaces";
import { DorsalJugador } from "@/lib/jugadores";
import Context from "@/context/contextPrincipal";

export const ModalDorsal: React.FC<ModalGlobalV2Props> = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const [light] = useContext(Context);
    const [dorsal, setDorsal] = useState(data?.dorsal);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: numeroJugador } = useMutation(jugadoresDorsal);
    const [errorDorsal, setErrorDorsal] = useState(false);
    const [errorMessageDorsal, setErrorMessageDorsal] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleDorsal = (event: any) => {
        const inputName = event.target.value;
        if (inputName.length <= 2) {
            setErrorDorsal(false)
            setErrorMessageDorsal('')
            setDorsal(inputName)
        }
    }

    useEffect(() => {
        setDorsal(data?.dorsal);
    }, [data]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {`Editar dorsal de ${data?.name}`}
                    <Num size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container sx={{ borderBottom: light ? "1px solid var(--dark2)" : "1px solid var(--cero)" }} />
                <Grid item container mb={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: '12px' }}>
                    Si el campo contiene (<span style={{ color: '#DE1212' }}>*</span>), entonces es requirodo
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Dorsal"
                        descripcion="Escribir dorsal"
                        placeholder="Dorsal"
                        type="text"
                        value={dorsal}
                        setValue={setDorsal}
                        handleActive
                        handleChange={handleDorsal}
                        error={errorDorsal}
                        textError={errorMessageDorsal}
                        lengths
                        max={2}
                        requerido
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Editar"
                            icon={Num}
                            handleclick={() => {
                                DorsalJugador(
                                    equipoId,
                                    jugadorId,
                                    numeroJugador,
                                    queryClient,
                                    dorsal,
                                    setIsLoading,
                                    handleClose,
                                    setErrorDorsal,
                                    setErrorMessageDorsal,
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