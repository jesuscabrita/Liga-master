import { jugadoresPut_capitan } from "@/services/jugadores";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { IoExit } from "react-icons/io5";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { ModalJugadorCapitanProps } from "@/interfaces";
import { editarCapitan } from "@/lib/jugadores";
import Context from "@/context/contextPrincipal";

export const ModalJugadorCapitan: React.FC<ModalJugadorCapitanProps> = ({ open, setOpen, jugador, equipoId }) => {
    const [light] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: capitan_jugador } = useMutation(jugadoresPut_capitan);
    const queryClient = useQueryClient();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {`Editar capitan`}
                    <img src="/images/capitan.png" alt="capitan" style={{ height: '15px' }} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container mt={2} alignItems={'center'} justifyContent={'center'} gap={1}>
                    <Grid item lg={4} md={4} xs={4}>
                        <ButtomSend
                            title="Si"
                            handleclick={() => {
                                editarCapitan(
                                    equipoId,
                                    jugador._id,
                                    jugador.name,
                                    setIsLoading,
                                    capitan_jugador,
                                    queryClient,
                                    'Si',
                                    handleClose
                                )
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} xs={4}>
                        <ButtomSend
                            type="warnning"
                            title="No"
                            handleclick={() => {
                                editarCapitan(
                                    equipoId,
                                    jugador._id,
                                    jugador.name,
                                    setIsLoading,
                                    capitan_jugador,
                                    queryClient,
                                    'No',
                                    handleClose
                                )
                            }}
                        />
                    </Grid>
                </Grid>
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