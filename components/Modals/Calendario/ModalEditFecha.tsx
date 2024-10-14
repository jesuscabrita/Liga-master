import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useMutation, useQueryClient } from "react-query";
import { useContext, useEffect, useState } from "react";
import { BiEditAlt as Editar } from 'react-icons/bi';
import { equiposEstadosPut } from "@/services/equipos";
import { ModalEditFechaProps } from "@/interfaces";
import { editarFechas } from "@/lib/equipos";
import { IoExit } from "react-icons/io5";
import Context from "@/context/contextPrincipal";
import moment from "moment";

export const ModalEditFecha: React.FC<ModalEditFechaProps> = ({ open, setOpen, id, data, index }) => {
    const [light] = useContext(Context);
    const [fecha, setFecha] = useState(data?.fecha ? moment(data.fecha[index]) : null);
    const { mutate: editarFecha } = useMutation(equiposEstadosPut);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setFecha(data?.fecha ? moment(data.fecha[index]) : null)
    }, [data]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Editar fecha"}
                    <Editar size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container>
                    <MobileDateTimePicker
                        value={fecha as any}
                        onChange={(date) => setFecha(date)}
                        sx={{
                            borderRadius: "9px",
                            '& .MuiInputBase-root': {
                                border: light ? '1px solid var(--dark2)' : '1px solid var(--cero)',
                                color: light ? 'var(--dark2)' : 'var(--cero)',
                                width: '100%',
                                height: '40px',
                            }
                        }}
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Editar"
                            icon={Editar}
                            disabled={moment(fecha).format('YYYY-MM-DD HH:mm:ss') === 'Invalid date'}
                            handleclick={() => {
                                editarFechas(
                                    id,
                                    index,
                                    setIsLoading,
                                    editarFecha,
                                    queryClient,
                                    handleClose,
                                    data,
                                    fecha,
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