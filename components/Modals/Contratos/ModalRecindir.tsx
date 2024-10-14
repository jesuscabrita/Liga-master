import { jugadoresRecindir } from "@/services/jugadores";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { FaFilePrescription as Recindir } from 'react-icons/fa';
import { formatoPesosArgentinos } from "@/utils";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { IoExit } from "react-icons/io5";
import { ModalRecindirProps } from "@/interfaces";
import { RecindirJugador } from "@/lib/jugadores";
import Context from "@/context/contextPrincipal";

export const ModalRecindir: React.FC<ModalRecindirProps> = ({ open, setOpen, data, equipoId }) => {
    const [light] = useContext(Context);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: recindirContrato } = useMutation(jugadoresRecindir);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {`Recindir contrato de  ${data.name}`}
                    <Recindir size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container sx={{ borderBottom: light ? "1px solid var(--dark2)" : "1px solid var(--cero)" }} />
                <Grid item mt={2} container sx={{ color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
                    {`Si vas a recindir el contrato de  
                    ${data.name} tienes que saber que debes pagar su sueldo 
                    de ${formatoPesosArgentinos(data.sueldo)}, y una indemnizacion
                    segun su contrato que es de  ${formatoPesosArgentinos(data.indemnizacion)}, 
                    se descontara automaticamente del banco del equipo`}
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Recindir"
                            icon={Recindir}
                            handleclick={() => { RecindirJugador(equipoId, data._id, recindirContrato, queryClient, 'Si', setIsLoading, handleClose) }}
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