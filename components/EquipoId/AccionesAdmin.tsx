import { Grid, useMediaQuery } from "@mui/material"
import { ButtomSend } from "../Shared/ButtonSend"
import { IoIosCreate as CreatePlayer } from 'react-icons/io';
import { useContext } from "react";
import { AccionesAdminProps } from "@/interfaces";
import Context from "@/context/contextPrincipal";

export const AccionesAdmin: React.FC<AccionesAdminProps> = ({
    data,
    modalDelegado,
    modalJugador,
    setModalDelegado,
    setModalJugador,
}) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    return (
        <>
            <Grid item container mt={2} mb={4} sx={{ border: light ? '1px var(--dark2) solid' : '1px var(--gris4) solid' }} />
            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '20px' : '13px', fontWeight: '500' }}>
                {`Acciones`}
            </Grid>
            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ padding: mobile ? '0px' : '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                <Grid item md={6} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '18px' : '16px', fontWeight: '500', }}>
                        {`Fichajes jugadores`}
                    </Grid>
                    <Grid item container width={'220px'} mt={2}>
                        <ButtomSend
                            title="Fichar jugador libre"
                            handleclick={() => { setModalJugador(!modalJugador) }}
                            icon={CreatePlayer}
                        />
                    </Grid>
                </Grid>
                <Grid item md={6} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: data?.equipo.delegado.length > 0 ? (light ? '#1f293768' : '#f9f8f85b') : light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '18px' : '16px', fontWeight: '500', }}>
                        {`Fichajes delegados`}
                    </Grid>
                    <Grid item container width={'220px'} mt={2}>
                        <ButtomSend
                            title="Fichar delegado libre"
                            handleclick={() => { setModalDelegado(!modalDelegado) }}
                            icon={CreatePlayer}
                            disabled={data?.equipo.delegado.length > 0}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}