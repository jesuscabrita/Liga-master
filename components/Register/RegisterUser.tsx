"use client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { handleCrearUser } from "@/lib/session";
import { InputDate } from "../Shared/inputDate";
import Context from "@/context/contextPrincipal";
import { ButtomSend } from "../Shared/ButtonSend";
import { InputFields } from "../Shared/InputFields";
import { RegisterRequest } from "@/services/session";
import { PiTrademarkRegistered } from "react-icons/pi";
import { InputPassword } from "../Shared/InputPassword";
import { LoadingScreen } from "../Shared/LoadingScreen";
import { useMutation, useQueryClient } from "react-query";
import { Avatar, Grid, Paper, useMediaQuery } from "@mui/material";

export const RegisterUser = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha_de_nacimiento, setFecha_de_nacimiento] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeated_password, setRepeated_password] = useState('');
    const [equipo, setEquipo] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const { mutate: crearUsers, isLoading: cargando } = useMutation(RegisterRequest);
    const queryClient = useQueryClient();
    const router = useRouter();
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorMessageNombre, setErrorMessageNombre] = useState('');
    const [errorApellido, setErrorApellido] = useState(false);
    const [errorMessageApellido, setErrorMessageApellido] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorRepeated_password, setErrorRepeated_password] = useState(false);
    const [errorMessageRepeated_password, setErrorMessageRepeated_password] = useState('');
    const [errorFecha_de_nacimiento, setErrorFecha_de_nacimiento] = useState(false);
    const [errorMessageFecha_de_nacimiento, setErrorMessageFecha_de_nacimiento] = useState('');
    const [errorEquipo, setErrorEquipo] = useState(false);
    const [errorMessageEquipo, setErrorMessageEquipo] = useState('');

    const navigateToLogin = () => {
        router.push("/login");
    };

    const handleNombre = (event: any) => {
        setErrorNombre(false)
        setErrorMessageNombre('')
        setNombre(event.target.value)
    }

    const handleApellido = (event: any) => {
        setErrorApellido(false)
        setErrorMessageApellido('')
        setApellido(event.target.value)
    }

    const handleEmail = (event: any) => {
        setErrorEmail(false)
        setErrorMessageEmail('')
        setEmail(event.target.value)
    }

    const handlePassword = (event: any) => {
        setErrorPassword(false)
        setErrorMessagePassword('')
        setPassword(event.target.value)
    }

    const handleRepeatedPassword = (event: any) => {
        setErrorRepeated_password(false)
        setErrorMessageRepeated_password('')
        setRepeated_password(event.target.value)
    }

    const handleFechaDeNacimiento = (event: any) => {
        setErrorFecha_de_nacimiento(false)
        setErrorMessageFecha_de_nacimiento('')
        setFecha_de_nacimiento(event)
    }

    const handleEquipo = (event: any) => {
        setErrorEquipo(false)
        setErrorMessageEquipo('')
        setEquipo(event.target.value)
    }

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: mobile ? '100%' : '100%' }}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    <Grid item container>
                        <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                            <img style={{ height: mobile ? '150px' : '' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                        </Grid>
                        <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                            <Avatar sx={{ m: 1, bgcolor: !light ? "#aab4be" : 'var(--dark2)' }}>
                                <PiTrademarkRegistered color={light ? '#aab4be' : 'var(--dark2)'} />
                            </Avatar>
                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                Registro
                            </Grid>
                            <Grid item container sx={{ borderBottom: light ? "1px solid var(--dark2)" : "1px solid var(--cero)" }} />
                            <Grid item container mb={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: '12px' }}>
                                Si el campo contiene (<span style={{ color: '#DE1212' }}>*</span>), entonces es requirodo
                            </Grid>
                            <Grid item container>
                                <InputFields
                                    handleActive
                                    handleChange={handleNombre}
                                    title="Nombre"
                                    placeholder="Nombre"
                                    type="text"
                                    descripcion="Escribir un nombre"
                                    value={nombre}
                                    setValue={setNombre}
                                    error={errorNombre}
                                    textError={errorMessageNombre}
                                    requerido
                                />
                            </Grid>
                            <Grid item container>
                                <InputFields
                                    handleActive
                                    handleChange={handleApellido}
                                    title="Apellido"
                                    placeholder="Apellido"
                                    type="text"
                                    descripcion="Escribir un apellido"
                                    value={apellido}
                                    setValue={setApellido}
                                    error={errorApellido}
                                    textError={errorMessageApellido}
                                    requerido
                                />
                            </Grid>
                            <Grid item container>
                                <InputFields
                                    handleActive
                                    handleChange={handleEmail}
                                    title="Email"
                                    placeholder="example@example.com"
                                    type="email"
                                    descripcion="Escribir un email"
                                    value={email}
                                    setValue={setEmail}
                                    error={errorEmail}
                                    textError={errorMessageEmail}
                                    requerido
                                />
                            </Grid>
                            <Grid item container>
                                <InputDate
                                    handleActive
                                    handleChange={handleFechaDeNacimiento}
                                    title="Fecha de nacimiento"
                                    value={fecha_de_nacimiento}
                                    setValue={setFecha_de_nacimiento}
                                    descripcion="Seleccionar una fecha"
                                    error={errorFecha_de_nacimiento}
                                    textError={errorMessageFecha_de_nacimiento}
                                    requerido
                                />
                            </Grid>
                            <Grid item container>
                                <InputPassword
                                    handleActive
                                    handleChange={handlePassword}
                                    title="Contraseña"
                                    placeholder="Contraseña"
                                    descripcion="Escribir una contraseña"
                                    value={password}
                                    setValue={setPassword}
                                    error={errorPassword}
                                    textError={errorMessagePassword}
                                    requerido
                                />
                            </Grid>
                            <Grid item container>
                                <InputPassword
                                    handleActive
                                    handleChange={handleRepeatedPassword}
                                    title="Repetir contraseña"
                                    placeholder="contraseña"
                                    descripcion="Escribir una contraseña repetida"
                                    value={repeated_password}
                                    setValue={setRepeated_password}
                                    error={errorRepeated_password}
                                    textError={errorMessageRepeated_password}
                                    requerido
                                />
                            </Grid>
                            <Grid item container>
                                <InputFields
                                    handleActive
                                    handleChange={handleEquipo}
                                    title="Nombre de tu equipo"
                                    placeholder="Equipo"
                                    type="text"
                                    descripcion="Escribir un nombre para tu equipo"
                                    value={equipo}
                                    setValue={setEquipo}
                                    error={errorEquipo}
                                    textError={errorMessageEquipo}
                                    requerido
                                />
                            </Grid>
                            <Grid item container mt={2}>
                                <ButtomSend
                                    enter
                                    title="Registrar"
                                    handleclick={() => {
                                        handleCrearUser(
                                            nombre,
                                            apellido,
                                            moment(fecha_de_nacimiento).format('YYYY-MM-DD'),
                                            email,
                                            password,
                                            repeated_password,
                                            equipo,
                                            setIsLoading,
                                            crearUsers,
                                            queryClient,
                                            router,
                                            setErrorNombre,
                                            setErrorMessageNombre,
                                            setErrorApellido,
                                            setErrorMessageApellido,
                                            setErrorEmail,
                                            setErrorMessageEmail,
                                            setErrorPassword,
                                            setErrorMessagePassword,
                                            setErrorRepeated_password,
                                            setErrorMessageRepeated_password,
                                            setErrorFecha_de_nacimiento,
                                            setErrorMessageFecha_de_nacimiento,
                                            setErrorEquipo,
                                            setErrorMessageEquipo
                                        )
                                    }}
                                    icon={PiTrademarkRegistered}
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