"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { PiPasswordLight } from "react-icons/pi";
import { ButtomSend } from "../Shared/ButtonSend"
import { InputFields } from "../Shared/InputFields"
import { LoadingScreen } from "../Shared/LoadingScreen";
import { handleSolicitarPassword } from "@/lib/session";
import { useMutation, useQueryClient } from "react-query";
import { SolicitarContraseñaRequest } from "@/services/session";
import { Avatar, Grid, Paper, useMediaQuery } from "@mui/material"
import { MdSettingsBackupRestore as Restore } from "react-icons/md";
import Context from "@/context/contextPrincipal";

export const FormForgotPassword = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const { mutate: solicitarContraseña, isLoading: cargando } = useMutation(SolicitarContraseñaRequest);
    const queryClient = useQueryClient();
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');

    const handlePassword = (event: any) => {
        setEmailError(false)
        setEmailErrorText('')
        setEmail(event.target.value)
    }

    const navigateToLogin = () => {
        router.push("/login");
    };

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 200px 60px 200px", height: '100%' }}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    <Grid item container>
                        <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                            <img style={{ height: mobile ? '150px' : '' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                        </Grid>
                        <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                            <Avatar sx={{ m: 1, bgcolor: !light ? "#aab4be" : 'var(--dark2)' }}>
                                <PiPasswordLight color={light ? '#aab4be' : 'var(--dark2)'} />
                            </Avatar>
                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                Olvidé mi contraseña
                            </Grid>
                            <Grid item sx={{ width: '100%' }}>
                                <InputFields
                                    title="Email"
                                    placeholder="example@example.com"
                                    type="email"
                                    descripcion="Escribir un email"
                                    value={email}
                                    setValue={setEmail}
                                    error={emailError}
                                    textError={emailErrorText}
                                    handleActive
                                    handleChange={handlePassword}
                                    requerido
                                />
                            </Grid>
                            <Grid item container mt={2}>
                                <ButtomSend
                                    enter
                                    title="Restablecer contraseña"
                                    handleclick={() => { handleSolicitarPassword(setIsLoading, solicitarContraseña, email, queryClient, router, setEmailError, setEmailErrorText) }}
                                    icon={Restore}
                                    isLoading={cargando}
                                />
                            </Grid>
                            <Grid item mt={2}>
                                <Grid item sx={{ color: light ? "#444748" : 'var(--gris)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToLogin}>
                                    Volver a iniciar sesión
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {isLoading && <LoadingScreen />}
        </Grid>
    )
}