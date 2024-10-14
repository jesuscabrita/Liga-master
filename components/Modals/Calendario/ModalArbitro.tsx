import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent } from "@mui/material";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { InputSelects } from "@/components/Shared/InputSelect";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { useMutation, useQueryClient } from "react-query";
import { useContext, useEffect, useState } from "react";
import { equiposEstadosPut } from "@/services/equipos";
import { BiEditAlt as Editar } from 'react-icons/bi';
import { ModalArbitroProps } from "@/interfaces";
import { editarArbitros } from "@/lib/equipos";
import { IoExit } from "react-icons/io5";
import { arbitros } from "@/utils/arrays";
import Context from "@/context/contextPrincipal";

export const ModalArbitro: React.FC<ModalArbitroProps> = ({ open, setOpen, data, index, id }) => {
    const [light] = useContext(Context);
    const [arbitro, setArbitro] = useState(data?.arbitro[index] === 'No definido' ? 'Elija una opción' : data?.arbitro[index]);
    const { mutate: editarArbitro } = useMutation(equiposEstadosPut);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [errorArbitro, setErrorArbitro] = useState(false);
    const [errorArbitroText, setErrorArbitroTex] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectArbitros = (event: SelectChangeEvent<string>) => {
        setErrorArbitro(false)
        setErrorArbitroTex('')
        setArbitro(event.target.value)
    }

    useEffect(() => {
        setArbitro(data?.arbitro[index] === 'No definido' ? 'Elija una opción' : data?.arbitro[index]);
    }, [data]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Editar arbitro"}
                    <Editar size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <InputSelects
                    value={arbitro}
                    title="Abritros"
                    data={arbitros}
                    descripcion="Seleccionar un arbitro"
                    handleSelect={handleSelectArbitros}
                    error={errorArbitro}
                    textError={errorArbitroText}
                />
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSend
                            title="Editar"
                            icon={Editar}
                            handleclick={() => {
                                editarArbitros(
                                    id,
                                    arbitro,
                                    index,
                                    setIsLoading,
                                    editarArbitro,
                                    queryClient,
                                    handleClose,
                                    data,
                                    setErrorArbitro,
                                    setErrorArbitroTex,
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