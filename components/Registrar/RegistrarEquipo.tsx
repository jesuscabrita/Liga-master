"use client";
import { Grid, Paper, useMediaQuery } from "@mui/material"
import { useMutation, useQueryClient } from "react-query";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { LoadingScreen } from "../Shared/LoadingScreen";
import { InputUpload } from "../Shared/InputUpload";
import { InputFields } from "../Shared/InputFields";
import { ButtomSend } from "../Shared/ButtonSend";
import { equiposPost } from "@/services/equipos";
import { FaCircleCheck } from "react-icons/fa6";
import { IoTimerSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { nuevoEquipo } from "@/lib/equipos";
import { ContextType } from "@/interfaces";
import { fetchEquiposSet } from "@/lib";
import { filterEstado } from "@/utils";
import ContextRefac from "@/context/contextLogin";
import Context from "@/context/contextPrincipal";

export const RegistrarEquipo = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const queryClient = useQueryClient();
    const router = useRouter();
    const [data, setData] = useState([]);
    fetchEquiposSet(setData)
    const [light] = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [logoAdded, setLogoAdded] = useState(false);
    const [imageName, setImageName] = useState('');
    const [isLoading, setIsloading] = useState(false)
    const { state: { user } } = useContext(ContextRefac) as ContextType;
    const { mutate: crearEquipo } = useMutation(equiposPost);
    const [errorLogo, setErrorLogo] = useState(false);
    const [errorLogoMessage, setErrorLogoMessage] = useState('');
    const isUserEmailInData = filterEstado(data, 'registrado').some((equipo) => equipo.correo === user?.email);
    const isUserEmailInDataEnCola = filterEstado(data, 'enCola').some((equipo) => equipo.correo === user?.email);

    useEffect(() => {
        if (!user) {
            router.replace("/404");
        }
    }, [user, router]);

    if (!user) {
        return;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorLogo(false);
        setErrorLogoMessage('')
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setImage(result);
                    setLogoAdded(true);
                    setImageName(file.name);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: '100%' }}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    <Grid item container alignItems={'center'} justifyContent={'center'}>
                        <Grid item container alignItems={'center'} justifyContent={'center'}>
                            <img style={{ height: mobile ? '140px' : '150px' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                        </Grid>
                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                            Registrar equipo
                        </Grid>
                        {(!isUserEmailInData && !isUserEmailInDataEnCola) ?
                            <Grid item container mt={2} gap={2} alignItems={'center'} justifyContent={'center'}>
                                <Grid item container md={6}>
                                    <InputFields
                                        title="Nombre"
                                        placeholder="Nombre"
                                        descripcion="Este es el nombre de tu equipo"
                                        type="text"
                                        setValue={setName}
                                        value={user?.equipo}
                                        disabled
                                    />
                                </Grid>
                                <Grid item container md={6}>
                                    <InputFields
                                        title="Email"
                                        placeholder="example@example.com"
                                        descripcion="Este es el email de tu equipo"
                                        type="text"
                                        setValue={setEmail}
                                        value={user?.email}
                                        disabled
                                    />
                                </Grid>
                                <Grid item container md={6}>
                                    <InputFields
                                        title="Instagram"
                                        descripcion="Escriba su instagram"
                                        type="text"
                                        placeholder="Instagram"
                                        setValue={setInstagram}
                                        value={instagram}
                                    />
                                </Grid>
                                <Grid item container md={6}>
                                    <InputUpload
                                        title='Logo'
                                        subtitle="Agregue la foto"
                                        descripcion="Carga o arrastra aqui tu logo"
                                        handleImageChange={handleImageChange}
                                        imageName={imageName}
                                        setImage={setImage}
                                        setImageName={setImageName}
                                        logoAdded={logoAdded}
                                        setLogoAdded={setLogoAdded}
                                        error={errorLogo}
                                        textError={errorLogoMessage}
                                    />
                                </Grid>
                                <Grid item container md={6}>
                                    <ButtomSend
                                        title="Registrar"
                                        icon={MdPlaylistAddCheckCircle}
                                        handleclick={() => {
                                            nuevoEquipo(
                                                user?.equipo,
                                                image,
                                                user?.email,
                                                instagram,
                                                setIsloading,
                                                crearEquipo,
                                                queryClient,
                                                setImage,
                                                setInstagram,
                                                setLogoAdded,
                                                setImageName,
                                                router,
                                                setErrorLogo,
                                                setErrorLogoMessage,
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            :
                            <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', fontSize: '18px', height: mobile ? '60vh' : '70vh' }}>
                                <Grid item mt={6} mb={2} container alignItems={'center'} justifyContent={'center'}>
                                    {isUserEmailInDataEnCola ? <IoTimerSharp size={mobile ? 160 : 200} /> : <FaCircleCheck size={mobile ? 160 : 200} />}
                                </Grid>
                                {isUserEmailInDataEnCola ? 'Tu equipo paso a lista de espera' : 'Ya tienes un equipo registrado'}
                            </Grid>
                        }
                    </Grid>
                </Paper>
            </Grid>
            {isLoading && <LoadingScreen />}
        </Grid>
    )
}