"use client";
import { CiLogin } from "react-icons/ci";
import { ContextType } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { CiLock as Lock } from "react-icons/ci";
import { ButtomSend } from "../Shared/ButtonSend";
import { InputFields } from "../Shared/InputFields"
import { InputPassword } from "../Shared/InputPassword";
import { Avatar, Grid, Paper, useMediaQuery } from "@mui/material"
import Context from "@/context/contextPrincipal";
import ContextRefac from "@/context/contextLogin";

export const FormLogin = () => {
    const router = useRouter();
    const [light] = useContext(Context);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { state, SignIn } = useContext(ContextRefac) as ContextType;
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [messageErrorEmail, setMessageErrorEmail] = useState('');
    const [messageErrorPassword, setMessageErrorPassword] = useState('');

    const handleEmail = (event: any) => {
        setErrorEmail(false)
        setMessageErrorEmail('')
        setEmailOrUsername(event.target.value)
    }

    const handlePassword = (event: any) => {
        setErrorPassword(false)
        setMessageErrorPassword('')
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            await SignIn({
                email: emailOrUsername,
                password,
                setErrorEmail,
                setErrorPassword,
                setMessageErrorEmail,
                setMessageErrorPassword
            });
        }, 1500);
    };

    const navigateToForgotPassword = () => {
        router.push("/forgot-password");
    };

    const navigateToRegister = () => {
        router.push("/register");
    };

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: mobile ? '100%' : '110vh' }}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    <Grid item container>
                        <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                            <img style={{ height: mobile ? '150px' : '' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                        </Grid>
                        <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                            <Avatar sx={{ m: 1, bgcolor: !light ? "#aab4be" : 'var(--dark2)' }}>
                                <Lock color={light ? '#aab4be' : 'var(--dark2)'} />
                            </Avatar>
                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                Iniciar sesión
                            </Grid>
                            <Grid item container>
                                <InputFields
                                    handleActive
                                    handleChange={handleEmail}
                                    setValue={setEmailOrUsername}
                                    title="Usuario"
                                    type="email"
                                    placeholder="example@example.com"
                                    descripcion="Escribir un email"
                                    error={errorEmail}
                                    value={emailOrUsername}
                                    textError={messageErrorEmail}
                                />
                            </Grid>
                            <Grid item container>
                                <InputPassword
                                    handleActive
                                    setValue={setPassword}
                                    handleChange={handlePassword}
                                    title="Contraseña"
                                    placeholder="Contraseña"
                                    descripcion="Escribir contraseña"
                                    value={password}
                                    error={errorPassword}
                                    textError={messageErrorPassword}
                                />
                            </Grid>
                            <Grid item container mt={2}>
                                <ButtomSend
                                    enter
                                    title="Iniciar sesión"
                                    handleclick={handleLogin}
                                    icon={CiLogin}
                                    isLoading={loading}
                                />
                            </Grid>
                            <Grid item mt={2}>
                                <Grid item sx={{ color: light ? "#444748" : 'var(--gris)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToForgotPassword}>
                                    ¿Olvidaste tu contraseña?
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid item sx={{ color: light ? "#444748" : 'var(--gris)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToRegister}>
                                    ¿No tienes una cuenta? Regístrate aquí
                                </Grid >
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}