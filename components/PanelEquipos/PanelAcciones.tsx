import { calculoContratosJugadores, devolverJugador, editarReset } from "@/lib/equipos";
import { Grid, Paper, Tooltip, useMediaQuery } from "@mui/material"
import { jugadoresContratoCalculo } from "@/services/jugadores";
import { FaFileContract as Contratos } from 'react-icons/fa';
import { devolverJugadorPrestamo } from "@/services/ofertas";
import { AiOutlineWarning as Warning } from 'react-icons/ai';
import { useMutation, useQueryClient } from "react-query";
import { resetEquiposJugador } from "@/services/equipos";
import { LoadingScreen } from "../Shared/LoadingScreen";
import { MdAdminPanelSettings } from "react-icons/md";
import { ButtomSend } from "../Shared/ButtonSend";
import { MdRestorePage } from "react-icons/md";
import { useContext, useState } from "react";
import Context from "@/context/contextPrincipal";

export const PanelAcciones = ({ data }: { data: any }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const queryClient = useQueryClient();
    const [isLoadinng, setIsLoadinng] = useState(false);
    const { mutate: reseteoEquipos } = useMutation(resetEquiposJugador);
    const { mutate: devolver } = useMutation(devolverJugadorPrestamo);
    const { mutate: calculo } = useMutation(jugadoresContratoCalculo);

    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris3)' : 'var(--dark4)', width: '120vh', }}>
            <Grid item container alignItems={'center'} justifyContent={'center'}>
                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                    Acciones de equipos
                </Grid>
                <Grid item container mt={2} xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                    <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                        <Grid item container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={2} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                            <MdAdminPanelSettings size={mobile ? 50 : 100} />
                        </Grid>
                    </Grid>
                    <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                        <Tooltip title="Calcula y analiza los contratos de los jugadores" placement="top">
                            <Grid item container mt={2}>
                                <ButtomSend
                                    title="Calcular contratos"
                                    handleclick={() => { calculoContratosJugadores(data, calculo, queryClient, setIsLoadinng) }}
                                    icon={Contratos}
                                />
                            </Grid>
                        </Tooltip>
                        <Tooltip title="Devuelve a los jugadores que se encuentran en calidad de PRESTAMO a sus equipos de origen" placement="top">
                            <Grid item container mt={1}>
                                <ButtomSend
                                    title="Calcular/Devolver Prestamos"
                                    handleclick={() => { devolverJugador(data, devolver, queryClient, setIsLoadinng) }}
                                    icon={MdRestorePage}
                                />
                            </Grid>
                        </Tooltip>
                        <Tooltip title="Resetea los datos de los equipos, es recomendable al terminar la liga o temporada" placement="top">
                            <Grid item container mt={1}>
                                <ButtomSend
                                    type="warnning"
                                    title="Resetear datos"
                                    handleclick={() => { editarReset(setIsLoadinng, queryClient, data, reseteoEquipos) }}
                                    icon={Warning}
                                />
                            </Grid>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            {isLoadinng && <LoadingScreen />}
        </Paper>
    )
}