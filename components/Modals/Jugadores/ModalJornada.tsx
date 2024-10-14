import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent } from "@mui/material";
import { jugadoresPut_jornada } from "@/services/jugadores";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { IoExit } from "react-icons/io5";
import { AiOutlineEdit as Edit } from 'react-icons/ai';
import { MdOutlinePersonOff as Suspender } from 'react-icons/md';
import { InputSelects } from "@/components/Shared/InputSelect";
import { ButtomSend } from "@/components/Shared/ButtonSend";
import { LoadingScreen } from "@/components/Shared/LoadingScreen";
import { optionJornada } from "@/utils/arrays";
import { editarJornada } from "@/lib/jugadores";
import { ModalJornadaProps } from "@/interfaces";
import Context from "@/context/contextPrincipal";

export const ModalJornada: React.FC<ModalJornadaProps> = ({ open, setOpen, id, equipoId, data }) => {
    const [light] = useContext(Context);
    const [jornada, setJornada] = useState('Elija una opción');
    const [jornadaResta, setJornadaResta] = useState('Elija una opción');
    const [suspendido, setSuspendido] = useState(data?.jornadas_suspendido)
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editarJornadas } = useMutation(jugadoresPut_jornada);
    const [errorJornada, setErrorJornada] = useState(false);
    const [errorMessageJornada, setErrorMessageJornada] = useState('');
    const [errorJornadaResta, setErrorJornadaResta] = useState(false);
    const [errorMessageJornadaResta, setErrorMessageJornadaResta] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectSumarJornada = (event: SelectChangeEvent<string>) => {
        setErrorJornada(false)
        setErrorMessageJornada('')
        setJornada(event.target.value)
    }

    const handleSelectSumarJornadaResta = (event: SelectChangeEvent<string>) => {
        setErrorJornadaResta(false)
        setErrorMessageJornadaResta('')
        setJornadaResta(event.target.value)
    }

    useEffect(() => {
        setSuspendido(data?.jornadas_suspendido);
    }, [data]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Modificar jornada"}
                    <Suspender size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Grid item container>
                    <InputSelects
                        title="Sumar jornadas"
                        value={jornada}
                        descripcion="Seleccionar jornadas"
                        handleSelect={handleSelectSumarJornada}
                        data={optionJornada}
                        error={errorJornada}
                        textError={errorMessageJornada}
                        disabled={jornadaResta !== 'Elija una opción'}
                    />
                </Grid>
                <Grid item container>
                    <ButtomSend
                        type="warnning"
                        title="Sumar"
                        disabled={jornadaResta !== 'Elija una opción'}
                        handleclick={() => {
                            editarJornada(
                                equipoId,
                                id,
                                data.name,
                                suspendido,
                                setIsLoading,
                                editarJornadas,
                                queryClient,
                                jornada,
                                handleClose,
                                setJornada,
                                true,
                                setErrorJornada,
                                setErrorMessageJornada,
                                setErrorJornadaResta,
                                setErrorMessageJornadaResta,
                                jornada,
                                jornadaResta,
                            )
                        }}
                        icon={Edit}
                    />
                </Grid>
                <Grid item container>
                    <InputSelects
                        title="Restar jornadas"
                        value={jornadaResta}
                        descripcion="Seleccionar jornadas"
                        handleSelect={handleSelectSumarJornadaResta}
                        data={optionJornada}
                        disabled={suspendido === 1 || jornada !== 'Elija una opción'}
                        error={errorJornadaResta}
                        textError={errorMessageJornadaResta}
                    />
                </Grid>
                <Grid item container>
                    <ButtomSend
                        title="Restar"
                        handleclick={() => {
                            editarJornada(
                                equipoId,
                                id,
                                data.name,
                                suspendido,
                                setIsLoading,
                                editarJornadas,
                                queryClient,
                                jornadaResta,
                                handleClose,
                                setJornada,
                                false,
                                setErrorJornada,
                                setErrorMessageJornada,
                                setErrorJornadaResta,
                                setErrorMessageJornadaResta,
                                jornada,
                                jornadaResta,
                            )
                        }}
                        icon={Edit}
                        disabled={suspendido === 1 || jornada !== 'Elija una opción'}
                    />
                </Grid>
                <Grid item container mt={3} sx={{ borderBottom: light ? "1px solid var(--dark2)" : "1px solid var(--cero)" }} />
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