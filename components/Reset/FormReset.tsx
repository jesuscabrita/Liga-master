"use client";
import { decodeToken } from "@/utils";
import Context from "@/context/contextPrincipal";
import { ButtomSend } from "../Shared/ButtonSend"
import { MdOutlineLockReset } from "react-icons/md";
import { handleResetPassword } from "@/lib/session";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LoadingScreen } from "../Shared/LoadingScreen";
import { InputPassword } from "../Shared/InputPassword"
import { useMutation, useQueryClient } from "react-query";
import { CambiarContraseñaRequest } from "@/services/session";
import { Avatar, Grid, Paper, useMediaQuery } from "@mui/material"
import { MdSettingsBackupRestore as Restore } from "react-icons/md";

export const FormReset = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const router = useRouter();
    const { resetToken } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeated_password, setRepeated_password] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { mutate: cambiarContraseñas, isLoading: cargando } = useMutation(CambiarContraseñaRequest);
    const queryClient = useQueryClient();
    const [PasswordError, setPasswordError] = useState(false);
    const [PasswordErrorText, setPasswordErrorText] = useState('');
    const [Repeated_passwordError, setRepeated_passwordError] = useState(false);
    const [Repeated_passwordErrorText, setRepeated_passwordErrorText] = useState('');

    useEffect(() => {
        if (resetToken) {
            try {
                const decoded = decodeToken(resetToken);
                if (decoded && decoded.userId) {
                    setEmail(decoded.userId);
                } else {
                    console.error("Token inválido o sin email");
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }, [resetToken]);

    const handleAtrasClick = () => {
        router.push('/login')
    };

    const handlePassword = (event: any) => {
        setPasswordError(false)
        setPasswordErrorText('')
        setPassword(event.target.value)
    }

    const handleRepeatedPassword = (event: any) => {
        setRepeated_passwordError(false)
        setRepeated_passwordErrorText('')
        setRepeated_password(event.target.value)
    }

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
                                <MdOutlineLockReset color={light ? '#aab4be' : 'var(--dark2)'} />
                            </Avatar>
                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                Restablecer contraseña
                            </Grid>
                            <Grid item container>
                                <InputPassword
                                    title="Nueva Contraseña"
                                    descripcion="Escribir una nueva contraseña"
                                    placeholder="contraseña"
                                    value={password}
                                    setValue={setPassword}
                                    error={PasswordError}
                                    textError={PasswordErrorText}
                                    handleActive
                                    handleChange={handlePassword}
                                    requerido
                                />
                            </Grid>
                            <Grid item container>
                                <InputPassword
                                    title="Repetir Contraseña"
                                    descripcion="Escribir y repita la contraseña"
                                    placeholder="contraseña"
                                    value={repeated_password}
                                    setValue={setRepeated_password}
                                    error={Repeated_passwordError}
                                    textError={Repeated_passwordErrorText}
                                    handleActive
                                    handleChange={handleRepeatedPassword}
                                    requerido
                                />
                            </Grid>
                            <Grid item container mt={2}>
                                <ButtomSend
                                    enter
                                    title="Restablecer contraseña"
                                    handleclick={() => { handleResetPassword(setIsLoading, cambiarContraseñas, password, repeated_password, queryClient, router, setPasswordError, setPasswordErrorText, setRepeated_passwordError, setRepeated_passwordErrorText, email) }}
                                    icon={Restore}
                                    isLoading={cargando}
                                />
                            </Grid>
                            <Grid item mt={2}>
                                <Grid item sx={{ color: light ? "#444748" : 'var(--gris)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }} onClick={handleAtrasClick}>
                                    Volver atrás
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